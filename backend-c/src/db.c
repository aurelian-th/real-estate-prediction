#include "include/db.h"
#include <stdio.h>
PGconn* db_connect(const char *conn_info_str) {
    printf("[STUB] db_connect called with: %s\n", conn_info_str);
    return NULL;
}
void db_disconnect(PGconn *conn) {
    printf("[STUB] db_disconnect called.\n");
}
