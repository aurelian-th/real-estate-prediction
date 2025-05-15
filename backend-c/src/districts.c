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
