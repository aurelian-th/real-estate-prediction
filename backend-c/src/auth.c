#include "include/auth.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h> // For malloc, free

// STUB IMPLEMENTATIONS

int register_user_stub(PGconn *conn, const char *email, const char *password, const char *full_name) {
    printf("[STUB C] register_user_stub called for email: %s\n", email);
    // In a real implementation:
    // 1. Hash password
    // 2. Check if email exists in DB
    // 3. Insert new user into DB
    if (strcmp(email, "exists@example.com") == 0) {
        return -1; // Simulate email exists
    }
    return 0; // Simulate success
}

User* login_user_stub(PGconn *conn, const char *email, const char *password) {
    printf("[STUB C] login_user_stub called for email: %s\n", email);
    // In a real implementation:
    // 1. Fetch user by email from DB
    // 2. Verify password hash
    // 3. Populate and return User struct
    if (strcmp(email, "demo@example.com") == 0 && strcmp(password, "password123") == 0) {
        User *user = (User*)malloc(sizeof(User));
        if (!user) return NULL;
        strncpy(user->user_id, "mock-user-id-123", sizeof(user->user_id) -1);
        user->user_id[sizeof(user->user_id)-1] = '\\0';
        strncpy(user->email, email, sizeof(user->email) -1);
        user->email[sizeof(user->email)-1] = '\\0';
        strncpy(user->full_name, "Demo User (Stub)", sizeof(user->full_name)-1);
        user->full_name[sizeof(user->full_name)-1] = '\\0';
        return user;
    }
    return NULL; // Simulate login failure
}

char* hash_password_stub(const char *password) {
    printf("[STUB C] hash_password_stub called.\n");
    // In a real implementation, use a strong hashing library (e.g., Argon2, bcrypt)
    char *hash = (char*)malloc(64); // Placeholder
    if (!hash) return NULL;
    snprintf(hash, 64, "hashed_%s_stub", password);
    return hash;
}

int verify_password_stub(const char *password, const char *hash) {
    printf("[STUB C] verify_password_stub called.\n");
    // In a real implementation, use the corresponding verification function
    char expected_hash[64];
    snprintf(expected_hash, 64, "hashed_%s_stub", password);
    return strcmp(hash, expected_hash) == 0;
}


//---------------------------------------------------------------------
// backend-c/src/include/db.h
#ifndef DB_H
#define DB_H

#include <postgresql/libpq-fe.h> // Official PostgreSQL C client library

// Establishes a connection to the PostgreSQL database
// conn_info_str: connection string (e.g., "dbname=mydb user=myuser password=mypass hostaddr=127.0.0.1 port=5432")
// Returns a PGconn object or NULL on failure
PGconn* db_connect(const char *conn_info_str);

// Closes the database connection
void db_disconnect(PGconn *conn);

// Executes a query that doesn't return results (e.g., INSERT, UPDATE, DELETE)
// Returns 0 on success, -1 on failure
int db_execute_noreturn(PGconn *conn, const char *query, int n_params, const char * const *param_values);

// Executes a query that returns results (e.g., SELECT)
// Caller is responsible for clearing the PGresult with PQclear()
// Returns a PGresult object or NULL on failure
PGresult* db_execute_query(PGconn *conn, const char *query, int n_params, const char * const *param_values);

#endif // DB_H

//---------------------------------------------------------------------
// backend-c/src/db.c
#include "include/db.h"
#include <stdio.h>
#include <stdlib.h>

// STUB IMPLEMENTATIONS

PGconn* db_connect(const char *conn_info_str) {
    printf("[STUB C] db_connect called with: %s. Returning NULL for stub.\n", conn_info_str);
    // Real implementation:
    // PGconn *conn = PQconnectdb(conn_info_str);
    // if (PQstatus(conn) != CONNECTION_OK) {
    //     fprintf(stderr, "Connection to database failed: %s", PQerrorMessage(conn));
    //     PQfinish(conn);
    //     return NULL;
    // }
    // return conn;
    return NULL; // Stub
}

void db_disconnect(PGconn *conn) {
    printf("[STUB C] db_disconnect called. PQfinish would be called here.\n");
    // Real implementation:
    // if (conn) {
    //     PQfinish(conn);
    // }
}

int db_execute_noreturn(PGconn *conn, const char *query, int n_params, const char * const *param_values) {
    printf("[STUB C] db_execute_noreturn called for query: %s (params: %d)\n", query, n_params);
    // Real implementation:
    // if (!conn) return -1;
    // PGresult *res = PQexecParams(conn, query, n_params, NULL, param_values, NULL, NULL, 0);
    // if (PQresultStatus(res) != PGRES_COMMAND_OK) {
    //     fprintf(stderr, "Query execution failed: %s", PQerrorMessage(conn));
    //     PQclear(res);
    //     return -1;
    // }
    // PQclear(res);
    return 0; // Stub success
}

PGresult* db_execute_query(PGconn *conn, const char *query, int n_params, const char * const *param_values) {
    printf("[STUB C] db_execute_query called for query: %s (params: %d). Returning NULL for stub.\n", query, n_params);
    // Real implementation:
    // if (!conn) return NULL;
    // PGresult *res = PQexecParams(conn, query, n_params, NULL, param_values, NULL, NULL, 0); // 0 for text results
    // if (PQresultStatus(res) != PGRES_TUPLES_OK) {
    //     fprintf(stderr, "Query execution failed or returned no tuples: %s", PQerrorMessage(conn));
    //     PQclear(res);
    //     return NULL;
    // }
    // return res;
    return NULL; // Stub
}
