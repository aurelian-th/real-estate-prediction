#ifndef USER_DASHBOARD_H
  #define USER_DASHBOARD_H

  #include <postgresql/libpq-fe.h>
  #include "jansson.h"

  typedef struct {
      char search_id[37]; // UUID
      char user_id[37];   // UUID
      char search_name[256];
      json_t *filters; // Parsed JSON filters
  } SavedSearch;

  // Gets saved searches for a user
  SavedSearch* get_saved_searches_stub(PGconn *conn, const char* user_id, int *count);
  // Adds a saved search for a user
  int add_saved_search_stub(PGconn *conn, const char* user_id, const char* search_name, const json_t* filters);

  json_t* saved_searches_to_json_stub(const SavedSearch *searches, int count);

  #endif // USER_DASHBOARD_H
  
