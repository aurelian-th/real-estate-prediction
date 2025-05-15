#ifndef DISTRICTS_H
#define DISTRICTS_H

#include <postgresql/libpq-fe.h>
#include "jansson.h"

typedef struct {
    int district_id;
    char name[101];
    char description[1024];
    double average_price_sqm;
} District;

// Fetches all districts
District* get_all_districts_stub(PGconn *conn, int *count);

// Fetches district by ID
District* get_district_by_id_stub(PGconn *conn, int district_id);

// Converts an array of District structs to a JSON array string
json_t* districts_to_json_stub(const District *districts, int count);
json_t* district_to_json_stub(const District *district);


#endif // DISTRICTS_H
