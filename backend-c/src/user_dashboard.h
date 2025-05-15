#include "include/user_dashboard.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

SavedSearch* get_saved_searches_stub(PGconn *conn, const char* user_id, int *count) {
    printf("[STUB C] get_saved_searches_stub for user_id: %s\n", user_id);
    *count = 1;
    SavedSearch* searches = (SavedSearch*)malloc(sizeof(SavedSearch) * (*count));
    if(!searches) { *count = 0; return NULL; }

    strcpy(searches[0].search_id, "mock-search-id-1");
    strcpy(searches[0].user_id, user_id);
    strcpy(searches[0].search_name, "My Botanica Search (Stub)");
    // Simulate filters
    searches[0].filters = json_pack("{s:i, s:i, s:i}", "district_id", 2, "min_rooms", 2, "max_rooms", 2);
    return searches;
}

int add_saved_search_stub(PGconn *conn, const char* user_id, const char* search_name, const json_t* filters) {
    char *filters_str = json_dumps(filters, JSON_COMPACT);
    printf("[STUB C] add_saved_search_stub for user_id: %s, name: %s, filters: %s\n", user_id, search_name, filters_str);
    free(filters_str);
    return 0; // Success
}

json_t* saved_searches_to_json_stub(const SavedSearch *searches, int count) {
    json_t *root = json_array();
    for(int i=0; i<count; ++i) {
        json_t *search_json = json_object();
        json_object_set_new(search_json, "search_id", json_string(searches[i].search_id));
        json_object_set_new(search_json, "user_id", json_string(searches[i].user_id));
        json_object_set_new(search_json, "search_name", json_string(searches[i].search_name));
        json_object_set(search_json, "filters", searches[i].filters); // Increment ref count if keeping original
        json_array_append_new(root, search_json);
    }
    return root;
}
