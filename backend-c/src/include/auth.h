#ifndef AUTH_H
#define AUTH_H
int register_user(const char* email, const char* password);
int login_user(const char* email, const char* password);
#endif // AUTH_H
