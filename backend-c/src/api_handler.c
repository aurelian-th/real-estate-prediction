#include "include/api_handler.h"
#include "include/properties.h"
#include "include/districts.h"
#include "include/auth.h"
#include "include/user_dashboard.h" // Added
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Helper to create a JSON string from json_t*, then free json_t*
static char* json_to_string_and_free(json_t *json_obj) {
    if (!json_obj) {
        json_t *err = json_pack("{s:s}", "error", "Internal server error or no data");
        char *err_str = json_dumps(err, JSON_INDENT(2));
        json_decref(err);
        return err_str;
    }
    char *str = json_dumps(json_obj, JSON_INDENT(2));
    json_decref(json_obj);
    return str;
}

char* handle_get_properties_request_stub(PGconn *conn, const char* query_params_json_string) {
    printf("[STUB C API] handle_get_properties_request_stub with params: %s\n", query_params_json_string ? query_params_json_string : "N/A");
    // Parse query_params_json_string to PropertyFilters (omitted for stub)
    PropertyFilters filters = {0}; // Default no filters
    // Example: if params indicate Botanica
    // if (query_params_json_string && strstr(query_params_json_string, "\"district_id\":2")) {
    //    filters.district_id = 2;
    // }

    int count = 0;
    Property* props = get_properties_stub(conn, &filters, &count);
    json_t* props_json = properties_to_json_stub(props, count);
    free(props); // Properties themselves are on stack in stub, but array is heap
    return json_to_string_and_free(props_json);
}

char* handle_get_property_detail_request_stub(PGconn *conn, const char* property_id) {
    printf("[STUB C API] handle_get_property_detail_request_stub for ID: %s\n", property_id);
    Property* prop = get_property_by_id_stub(conn, property_id);
    json_t* prop_json = property_to_json_stub(prop);
    if (prop) free(prop);
    return json_to_string_and_free(prop_json);
}

char* handle_get_districts_request_stub(PGconn *conn) {
    printf("[STUB C API] handle_get_districts_request_stub\n");
    int count = 0;
    District* districts = get_all_districts_stub(conn, &count);
    json_t* districts_json = districts_to_json_stub(districts, count);
    if (districts) free(districts);
    return json_to_string_and_free(districts_json);
}

char* handle_get_price_trends_request_stub(PGconn *conn, int district_id, const char* query_params_json_string) {
    printf("[STUB C API] handle_get_price_trends_request_stub for district %d, params: %s\n", district_id, query_params_json_string ? query_params_json_string : "N/A");
    // Simulate fetching trend data for Botanica, 2 rooms
    if (district_id == 2 /* Botanica */) {
        // In a real app, parse num_rooms from query_params_json_string
        // And query price_history table
        json_t *trends_data = json_array();
        json_array_append_new(trends_data, json_pack("{s:s, s:f}", "date", "2023-01", "price", 51000.0));
        json_array_append_new(trends_data, json_pack("{s:s, s:f}", "date", "2023-02", "price", 51200.0));
        // ... add more from 002_sample_data.sql
        json_array_append_new(trends_data, json_pack("{s:s, s:f}", "date", "2023-12", "price", 53500.0));
        return json_to_string_and_free(trends_data);
    }
    return json_to_string_and_free(json_array()); // Empty array if no data
}

char* handle_get_predictions_request_stub(PGconn *conn, int district_id, const char* query_params_json_string) {
    printf("[STUB C API] handle_get_predictions_request_stub for district %d, params: %s\n", district_id, query_params_json_string ? query_params_json_string : "N/A");
    if (district_id == 2 /* Botanica */) {
        // Simulate fetching prediction data
        json_t *prediction_data = json_pack("{s:s, s:s, s:f, s:f}",
            "district", "Botanica",
            "num_rooms", "2 (simulated)",
            "prediction_6m_percentage", 1.5,
            "prediction_12m_percentage", 2.5
        );
        return json_to_string_and_free(prediction_data);
    }
    return json_to_string_and_free(json_object()); // Empty object if no data
}


char* handle_login_request_stub(PGconn *conn, const char* body_json_string) {
    printf("[STUB C API] handle_login_request_stub with body: %s\n", body_json_string);
    json_error_t error;
    json_t *body_json = json_loads(body_json_string, 0, &error);
    if (!body_json) {
        return json_to_string_and_free(json_pack("{s:s, s:s}", "error", "Invalid JSON body", "details", error.text));
    }

    const char *email = json_string_value(json_object_get(body_json, "email"));
    const char *password = json_string_value(json_object_get(body_json, "password"));

    if (!email || !password) {
        json_decref(body_json);
        return json_to_string_and_free(json_pack("{s:s}", "error", "Email and password required"));
    }

    User *user = login_user_stub(conn, email, password);
    json_decref(body_json);

    if (user) {
        json_t *response = json_pack("{s:s, s:s, s:{s:s, s:s, s:s}}",
            "message", "Login successful (stub)",
            "token", "mock-jwt-token-for-demo", // Simulate JWT
            "user", "user_id", user->user_id, "email", user->email, "full_name", user->full_name
        );
        free(user);
        return json_to_string_and_free(response);
    } else {
        return json_to_string_and_free(json_pack("{s:s}", "error", "Invalid credentials (stub)"));
    }
}


char* handle_register_request_stub(PGconn *conn, const char* body_json_string) {
    printf("[STUB C API] handle_register_request_stub with body: %s\n", body_json_string);
    // Similar parsing as login, then call register_user_stub
    // For MVP, can just return success or simple error
    return json_to_string_and_free(json_pack("{s:s}", "message", "Registration stub successful. Check C logs."));
}


char* handle_get_saved_searches_request_stub(PGconn *conn, const char* user_id_from_token) {
    printf("[STUB C API] handle_get_saved_searches_request_stub for user: %s\n", user_id_from_token);
    if (!user_id_from_token || strcmp(user_id_from_token, "mock-user-id-123") != 0) {
         return json_to_string_and_free(json_pack("{s:s}", "error", "Unauthorized or invalid user for stub"));
    }
    int count = 0;
    SavedSearch* searches = get_saved_searches_stub(conn, user_id_from_token, &count);
    json_t *json_searches = saved_searches_to_json_stub(searches, count);

    // Cleanup for stub (json_deep_copy might be needed if filters are complexly shared)
    for(int i=0; i<count; ++i) if(searches[i].filters) json_decref(searches[i].filters);
    if(searches) free(searches);

    return json_to_string_and_free(json_searches);
}
