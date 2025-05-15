#ifndef PROPERTIES_H
 #define PROPERTIES_H

 #include <postgresql/libpq-fe.h>
 #include "jansson.h" // For JSON creation

 // Structure for a property, align with db schema
 typedef struct {
     char property_id[37]; // UUID
     int district_id;
     char district_name[101]; // To hold district name for convenience
     char address[256];
     int num_rooms;
     double area_sqm;
     double price;
     char description[1024];
     char property_type[51];
     int year_built;
     // Add other fields as needed for display
     char date_listed[12]; // YYYY-MM-DD
 } Property;

 // Structure for property filters
 typedef struct {
     int district_id; // 0 or -1 if not filtered
     int min_rooms;
     int max_rooms;
     double min_price;
     double max_price;
     // Add other filters as needed
 } PropertyFilters;

 // Fetches properties based on filters
 // Returns a dynamically allocated array of Property structs, and sets 'count'
 // Caller must free the array and its elements
 Property* get_properties_stub(PGconn *conn, const PropertyFilters *filters, int *count);

 // Fetches a single property by ID
 // Returns a dynamically allocated Property struct, or NULL if not found
 // Caller must free the struct
 Property* get_property_by_id_stub(PGconn *conn, const char *property_id);

 // Converts an array of Property structs to a JSON array string
 // Caller must free the returned string
 json_t* properties_to_json_stub(const Property *properties, int count);
 json_t* property_to_json_stub(const Property *property);


 #endif // PROPERTIES_H
