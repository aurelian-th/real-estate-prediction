#ifndef DB_H
#define DB_H
#include <libpq-fe.h>
PGconn* db_connect(const char *conn_info_str);
void db_disconnect(PGconn *conn);
#endif // DB_H
