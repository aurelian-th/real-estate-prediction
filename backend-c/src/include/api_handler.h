#ifndef API_HANDLER_H
#define API_HANDLER_H

// This would be for a library like libmicrohttpd
// For stubs, we'll just have functions that would be called by request handlers

#include <postgresql/libpq-fe.h>
#include "jansson.h"

// Example handler function signatures (these would be more complex with HTTP request/response objects)
// These functions would parse requests, call service functions (properties.c, districts.c), and format JSON responses.

// GET /api/properties
// Parses query params for filters
char* handle_get_properties_request_stub(PGconn *conn, const char* query_params_json_string);

// GET /api/properties/{id}
char* handle_get_property_detail_request_stub(PGconn *conn, const char* property_id);

// GET /api/districts
char* handle_get_districts_request_stub(PGconn *conn);

// GET /api/districts/{id}/trends
// Parses query params for num_rooms, time_range
char* handle_get_price_trends_request_stub(PGconn *conn, int district_id, const char* query_params_json_string);

// GET /api/districts/{id}/predictions
// Parses query params for num_rooms
char* handle_get_predictions_request_stub(PGconn *conn, int district_id, const char* query_params_json_string);

// POST /api/auth/login
char* handle_login_request_stub(PGconn *conn, const char* body_json_string);

// POST /api/auth/register
char* handle_register_request_stub(PGconn *conn, const char* body_json_string);

// GET /api/dashboard/saved-searches (requires auth)
char* handle_get_saved_searches_request_stub(PGconn *conn, const char* user_id_from_token);


#endif // API_HANDLER_H
