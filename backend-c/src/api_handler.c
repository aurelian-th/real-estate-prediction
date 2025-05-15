#include "include/api_handler.h"
#include "include/properties.h"
#include "include/districts.h"
#include "include/auth.h"
#include "include/user_dashboard.h"
#include "include/prediction.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <microhttpd.h>
#include <jansson.h>

// Global server instance
static struct MHD_Daemon* http_daemon = NULL;

// API route definitions
static api_route_t routes[] = {
    // Property routes
    {"/api/properties", METHOD_GET, properties_get_all},
    {"/api/properties/:id", METHOD_GET, properties_get_by_id},
    
    // District routes
    {"/api/districts", METHOD_GET, districts_get_all},
    {"/api/districts/:id", METHOD_GET, districts_get_by_id},
    {"/api/districts/:id/properties", METHOD_GET, districts_get_properties},
    
    // Price trends and predictions
    {"/api/trends", METHOD_GET, price_get_trends},
    {"/api/predictions", METHOD_GET, price_get_predictions},
    
    // Auth routes
    {"/api/auth/login", METHOD_POST, auth_login},
    {"/api/auth/register", METHOD_POST, auth_register},
    
    // User dashboard routes
    {"/api/user/saved-properties", METHOD_GET, user_get_saved_properties},
    {"/api/user/saved-properties", METHOD_POST, user_save_property},
    {"/api/user/saved-properties/:id", METHOD_DELETE, user_unsave_property},
    {"/api/user/saved-searches", METHOD_GET, user_get_saved_searches},
    {"/api/user/saved-searches", METHOD_POST, user_save_search},
    {"/api/user/saved-searches/:id", METHOD_DELETE, user_delete_saved_search}
};

// Number of routes
static const size_t route_count = sizeof(routes) / sizeof(routes[0]);

// Helper function to match URL pattern with route path
static int match_route(const char* url, const char* pattern, char** params) {
    // Simple matching logic - can be enhanced for more complex routes
    char url_copy[256];
    char pattern_copy[256];
    strncpy(url_copy, url, sizeof(url_copy) - 1);
    strncpy(pattern_copy, pattern, sizeof(pattern_copy) - 1);
    
    char* url_token = strtok(url_copy, "/");
    char* pattern_token = strtok(pattern_copy, "/");
    
    int param_index = 0;
    
    while (url_token != NULL && pattern_token != NULL) {
        // If pattern token starts with ':', it's a parameter
        if (pattern_token[0] == ':') {
            if (params != NULL) {
                params[param_index++] = strdup(url_token);
            }
        } else if (strcmp(url_token, pattern_token) != 0) {
            return 0; // Mismatch
        }
        
        url_token = strtok(NULL, "/");
        pattern_token = strtok(NULL, "/");
    }
    
    // If both are NULL, it's a complete match
    return (url_token == NULL && pattern_token == NULL);
}

// Helper to find route handler
static route_handler_func find_route_handler(const char* url, const char* method_str, char** params) {
    http_method_t method;
    
    // Convert method string to enum
    if (strcmp(method_str, "GET") == 0) {
        method = METHOD_GET;
    } else if (strcmp(method_str, "POST") == 0) {
        method = METHOD_POST;
    } else if (strcmp(method_str, "PUT") == 0) {
        method = METHOD_PUT;
    } else if (strcmp(method_str, "DELETE") == 0) {
        method = METHOD_DELETE;
    } else {
        return NULL; // Unsupported method
    }
    
    // Find matching route
    for (size_t i = 0; i < route_count; i++) {
        if (routes[i].method == method && match_route(url, routes[i].path, params)) {
            return routes[i].handler;
        }
    }
    
    return NULL; // No matching route
}

// Request handler callback for microhttpd
int api_request_handler(void* cls, struct MHD_Connection* connection,
                      const char* url, const char* method,
                      const char* version, const char* upload_data,
                      size_t* upload_data_size, void** con_cls) {
    
    static int request_counter = 0;
    
    // First call is used to setup connection context
    if (*con_cls == NULL) {
        *con_cls = &request_counter;
        return MHD_YES;
    }
    
    // Get query string
    const char* query_string = MHD_lookup_connection_value(
        connection, MHD_GET_ARGUMENT_KIND, NULL);
    
    // Extract request body (for POST/PUT)
    char* request_body = NULL;
    if (strcmp(method, "POST") == 0 || strcmp(method, "PUT") == 0) {
        if (*upload_data_size != 0) {
            request_body = malloc(*upload_data_size + 1);
            memcpy(request_body, upload_data, *upload_data_size);
            request_body[*upload_data_size] = '\0';
            *upload_data_size = 0;
            return MHD_YES;
        }
    }
    
    // Find route handler
    char* params[5] = {NULL}; // Allow up to 5 URL parameters
    route_handler_func handler = find_route_handler(url, method, params);
    
    struct MHD_Response* response;
    int ret;
    
    if (handler != NULL) {
        // Initialize API response
        api_response_t api_response = {
            .status_code = 200,
            .content_type = "application/json",
            .body = NULL,
            .body_size = 0
        };
        
        // Call route handler
        int result = handler(url, query_string, request_body, &api_response);
        
        if (result != 0) {
            // Handler failed, set error response
            api_response.status_code = 500;
            api_response.body = strdup("{\"error\":\"Internal server error\"}");
            api_response.body_size = strlen(api_response.body);
        }
        
        // Create and send response
        response = MHD_create_response_from_buffer(
            api_response.body_size, (void*) api_response.body, MHD_RESPMEM_MUST_FREE);
        
        MHD_add_response_header(response, "Content-Type", api_response.content_type);
        
        // Add CORS headers for development
        MHD_add_response_header(response, "Access-Control-Allow-Origin", "*");
        MHD_add_response_header(response, "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        MHD_add_response_header(response, "Access-Control-Allow-Headers", "Content-Type, Authorization");
        
        ret = MHD_queue_response(connection, api_response.status_code, response);
        MHD_destroy_response(response);
    } else {
        // No matching route found
        const char* error_msg = "{\"error\":\"Not found\"}";
        response = MHD_create_response_from_buffer(
            strlen(error_msg), (void*) error_msg, MHD_RESPMEM_PERSISTENT);
        
        MHD_add_response_header(response, "Content-Type", "application/json");
        ret = MHD_queue_response(connection, 404, response);
        MHD_destroy_response(response);
    }
    
    // Free resources
    if (request_body != NULL) {
        free(request_body);
    }
    
    for (int i = 0; i < 5; i++) {
        if (params[i] != NULL) {
            free(params[i]);
        }
    }
    
    return ret;
}

// Initialize API server
int api_server_init(unsigned int port) {
    http_daemon = MHD_start_daemon(
        MHD_USE_SELECT_INTERNALLY, port, NULL, NULL,
        &api_request_handler, NULL, MHD_OPTION_END);
    
    if (http_daemon == NULL) {
        fprintf(stderr, "Failed to start API server\n");
        return 1;
    }
    
    printf("API server initialized on port %u\n", port);
    return 0;
}

// Start API server
int api_server_start() {
    printf("API server started. Press Ctrl+C to stop.\n");
    
    // Block until signal
    while (1) {
        sleep(1);
    }
    
    return 0;
}

// Stop API server
void api_server_stop() {
    if (http_daemon != NULL) {
        MHD_stop_daemon(http_daemon);
        http_daemon = NULL;
        printf("API server stopped\n");
    }
}

// Create JSON response
api_response_t create_json_response(json_t* data, int status_code) {
    api_response_t response;
    response.status_code = status_code;
    response.content_type = "application/json";
    
    char* json_str = json_dumps(data, JSON_COMPACT);
    response.body = json_str;
    response.body_size = strlen(json_str);
    
    // The caller is responsible for freeing data
    json_decref(data);
    
    return response;
}

// Create error response
api_response_t create_error_response(const char* message, int status_code) {
    json_t* error = json_object();
    json_object_set_new(error, "error", json_string(message));
    
    return create_json_response(error, status_code);
}

/**
 * Handler for price trends API endpoint
 * GET /api/trends?district=1&rooms=2&months=12
 */
int price_get_trends(const char* url, const char* query_string, 
                     const char* request_body, api_response_t* response) {
    printf("[STUB] Processing price trends request: %s?%s\n", url, query_string ? query_string : "");
    
    // Parse query parameters
    int district_id = 1; // Default to Botanica
    int room_count = 2;  // Default to 2 rooms
    int months = 12;     // Default to 12 months
    
    if (query_string) {
        // Simple query string parsing - can be improved
        char query_copy[256];
        strncpy(query_copy, query_string, sizeof(query_copy) - 1);
        
        char* token = strtok(query_copy, "&");
        while (token) {
            if (strncmp(token, "district=", 9) == 0) {
                district_id = atoi(token + 9);
            } else if (strncmp(token, "rooms=", 6) == 0) {
                room_count = atoi(token + 6);
            } else if (strncmp(token, "months=", 7) == 0) {
                months = atoi(token + 7);
            }
            token = strtok(NULL, "&");
        }
    }
    
    // Validate parameters
    if (district_id <= 0 || room_count <= 0 || months <= 0) {
        return create_error_response("Invalid parameters", 400).status_code;
    }
    
    // Get trends data from prediction module
    json_t* trends = price_get_trends_handler(district_id, room_count, months);
    if (!trends) {
        return create_error_response("Failed to retrieve trends data", 500).status_code;
    }
    
    // Create response
    *response = create_json_response(trends, 200);
    json_decref(trends);
    
    return response->status_code;
}

/**
 * Handler for price predictions API endpoint
 * GET /api/predictions?district=1&rooms=2
 */
int price_get_predictions(const char* url, const char* query_string, 
                        const char* request_body, api_response_t* response) {
    printf("[STUB] Processing price predictions request: %s?%s\n", url, query_string ? query_string : "");
    
    // Parse query parameters
    int district_id = 1; // Default to Botanica
    int room_count = 2;  // Default to 2 rooms
    
    if (query_string) {
        // Simple query string parsing - can be improved
        char query_copy[256];
        strncpy(query_copy, query_string, sizeof(query_copy) - 1);
        
        char* token = strtok(query_copy, "&");
        while (token) {
            if (strncmp(token, "district=", 9) == 0) {
                district_id = atoi(token + 9);
            } else if (strncmp(token, "rooms=", 6) == 0) {
                room_count = atoi(token + 6);
            }
            token = strtok(NULL, "&");
        }
    }
    
    // Validate parameters
    if (district_id <= 0 || room_count <= 0) {
        return create_error_response("Invalid parameters", 400).status_code;
    }
    
    // Get prediction data from prediction module
    json_t* predictions = price_get_predictions_handler(district_id, room_count);
    if (!predictions) {
        return create_error_response("Failed to retrieve prediction data", 500).status_code;
    }
    
    // Create response
    *response = create_json_response(predictions, 200);
    json_decref(predictions);
    
    return response->status_code;
}
