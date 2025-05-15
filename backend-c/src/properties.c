    #include "include/properties.h"
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>

    // STUB IMPLEMENTATIONS

    Property* get_properties_stub(PGconn *conn, const PropertyFilters *filters, int *count) {
        printf("[STUB C] get_properties_stub called.\n");
        // Simulate fetching 2 properties based on mock data for demo
        *count = 2;
        Property *props = (Property*)malloc(sizeof(Property) * (*count));
        if (!props) {
            *count = 0;
            return NULL;
        }

        // Property 1 (matches mock data)
        strcpy(props[0].property_id, "mock-prop-id-1");
        props[0].district_id = 2; // Botanica
        strcpy(props[0].district_name, "Botanica");
        strcpy(props[0].address, "Bd. Dacia 20, Apt. 5");
        props[0].num_rooms = 2;
        props[0].area_sqm = 55.0;
        props[0].price = 52000;
        strcpy(props[0].description, "Cozy apartment near the park. (Stub)");
        strcpy(props[0].property_type, "Apartment");
        props[0].year_built = 1992;
        strcpy(props[0].date_listed, "2024-03-15");


        // Property 2 (matches mock data)
        strcpy(props[1].property_id, "mock-prop-id-2");
        props[1].district_id = 1; // Centru
        strcpy(props[1].district_name, "Centru");
        strcpy(props[1].address, "Str. Stefan cel Mare 1, Apt. 10");
        props[1].num_rooms = 3;
        props[1].area_sqm = 75.5;
        props[1].price = 90000;
        strcpy(props[1].description, "Spacious apartment in the heart of the city. (Stub)");
        strcpy(props[1].property_type, "Apartment");
        props[1].year_built = 1985;
        strcpy(props[1].date_listed, "2024-03-01");

        return props;
    }

    Property* get_property_by_id_stub(PGconn *conn, const char *property_id) {
        printf("[STUB C] get_property_by_id_stub called for ID: %s\n", property_id);
        if (strcmp(property_id, "mock-prop-id-1") == 0) {
            Property *prop = (Property*)malloc(sizeof(Property));
            if (!prop) return NULL;
            strcpy(prop->property_id, "mock-prop-id-1");
            prop->district_id = 2; // Botanica
            strcpy(prop->district_name, "Botanica");
            strcpy(prop->address, "Bd. Dacia 20, Apt. 5");
            prop->num_rooms = 2;
            prop->area_sqm = 55.0;
            prop->price = 52000;
            strcpy(prop->description, "Cozy apartment near the park. (Stub detail)");
            strcpy(prop->property_type, "Apartment");
            prop->year_built = 1992;
            strcpy(prop->date_listed, "2024-03-15");
            return prop;
        }
        return NULL;
    }


    json_t* property_to_json_stub(const Property *property) {
        if (!property) return NULL;
        json_t *root = json_object();
        json_object_set_new(root, "property_id", json_string(property->property_id));
        json_object_set_new(root, "district_id", json_integer(property->district_id));
        json_object_set_new(root, "district_name", json_string(property->district_name));
        json_object_set_new(root, "address", json_string(property->address));
        json_object_set_new(root, "num_rooms", json_integer(property->num_rooms));
        json_object_set_new(root, "area_sqm", json_real(property->area_sqm));
        json_object_set_new(root, "price", json_real(property->price));
        json_object_set_new(root, "description", json_string(property->description));
        json_object_set_new(root, "property_type", json_string(property->property_type));
        json_object_set_new(root, "year_built", json_integer(property->year_built));
        json_object_set_new(root, "date_listed", json_string(property->date_listed));
        return root;
    }

    json_t* properties_to_json_stub(const Property *properties, int count) {
        printf("[STUB C] properties_to_json_stub called for %d properties.\n", count);
        json_t *root = json_array();
        if (!root) return NULL;
        for (int i = 0; i < count; i++) {
            json_t *prop_json = property_to_json_stub(&properties[i]);
            if (prop_json) {
                json_array_append_new(root, prop_json);
            }
        }
        return root;
    }


    //---------------------------------------------------------------------
    // backend-c/src/include/districts.h
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

    //---------------------------------------------------------------------
    // backend-c/src/districts.c
    #include "include/districts.h"
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>

    District* get_all_districts_stub(PGconn *conn, int *count) {
        printf("[STUB C] get_all_districts_stub called.\n");
        *count = 2; // Simulate fetching 2 districts
        District *districts = (District*)malloc(sizeof(District) * (*count));
        if (!districts) { *count = 0; return NULL; }

        districts[0].district_id = 1;
        strcpy(districts[0].name, "Centru");
        strcpy(districts[0].description, "The central district of Chișinău. (Stub)");
        districts[0].average_price_sqm = 1200.00;

        districts[1].district_id = 2;
        strcpy(districts[1].name, "Botanica");
        strcpy(districts[1].description, "A large residential district. (Stub)");
        districts[1].average_price_sqm = 950.00;
        return districts;
    }

    District* get_district_by_id_stub(PGconn *conn, int district_id) {
         printf("[STUB C] get_district_by_id_stub called for ID: %d.\n", district_id);
         if (district_id == 2) { // Botanica
            District *district = (District*)malloc(sizeof(District));
            if(!district) return NULL;
            district->district_id = 2;
            strcpy(district->name, "Botanica");
            strcpy(district->description, "A large residential district with parks and green spaces. (Stub detail)");
            district->average_price_sqm = 950.00;
            return district;
         }
         return NULL;
    }


    json_t* district_to_json_stub(const District *district) {
        if (!district) return NULL;
        json_t *root = json_object();
        json_object_set_new(root, "district_id", json_integer(district->district_id));
        json_object_set_new(root, "name", json_string(district->name));
        json_object_set_new(root, "description", json_string(district->description));
        json_object_set_new(root, "average_price_sqm", json_real(district->average_price_sqm));
        return root;
    }

    json_t* districts_to_json_stub(const District *districts, int count) {
        printf("[STUB C] districts_to_json_stub called for %d districts.\n", count);
        json_t *root = json_array();
        if (!root) return NULL;
        for (int i = 0; i < count; i++) {
            json_t *dist_json = district_to_json_stub(&districts[i]);
            if (dist_json) {
                json_array_append_new(root, dist_json);
            }
        }
        return root;
    }