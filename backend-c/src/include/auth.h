#ifndef AUTH_H
#define AUTH_H

#include <postgresql/libpq-fe.h> // For PGconn (will be needed for actual db interaction)

// Placeholder for user structure, align with db schema
typedef struct {
    char user_id[37]; // UUID
    char email[256];
    char full_name[256];
} User;

// Function to handle user registration
// Returns 0 on success, -1 on error (e.g., email exists)
int register_user_stub(PGconn *conn, const char *email, const char *password, const char *full_name);

// Function to handle user login
// Returns a User struct on success (caller must free), NULL on failure
User* login_user_stub(PGconn *conn, const char *email, const char *password);

// Function to hash a password (placeholder)
char* hash_password_stub(const char *password);

// Function to verify a password against a hash (placeholder)
int verify_password_stub(const char *password, const char *hash);

#endif // AUTH_H
