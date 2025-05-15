#ifndef API_HANDLER_H
#define API_HANDLER_H

#include <microhttpd.h>
#include <jansson.h>

/**
 * API Endpoint Handler Types
 */
typedef enum {
    METHOD_GET,
    METHOD_POST,
    METHOD_PUT,
    METHOD_DELETE
} http_method_t;

/**
 * API Response structure
 */
typedef struct {
    int status_code;
    char* content_type;
    char* body;
    size_t body_size;
} api_response_t;

/**
 * API Route Handler function signature
 */
typedef int (*route_handler_func)(const char* url, const char* query_string, 
                                const char* request_body, api_response_t* response);

/**
 * API Route Definition
 */
typedef struct {
    const char* path;
    http_method_t method;
    route_handler_func handler;
} api_route_t;

/**
 * Initialize the API server with specified port
 * @param port Port number to listen on
 * @return 0 on success, non-zero on failure
 */
int api_server_init(unsigned int port);

/**
 * Start the API server (blocking call)
 * @return 0 on success, non-zero on failure
 */
int api_server_start();

/**
 * Stop the API server
 */
void api_server_stop();

/**
 * Internal request handler - Should not be called directly
 */
int api_request_handler(void* cls, struct MHD_Connection* connection,
                      const char* url, const char* method,
                      const char* version, const char* upload_data,
                      size_t* upload_data_size, void** con_cls);

/**
 * Create a JSON response
 * @param data JSON data to send
 * @param status_code HTTP status code
 * @return api_response_t with JSON data
 */
api_response_t create_json_response(json_t* data, int status_code);

/**
 * Create an error response
 * @param message Error message
 * @param status_code HTTP status code
 * @return api_response_t with error message
 */
api_response_t create_error_response(const char* message, int status_code);

#endif // API_HANDLER_H
