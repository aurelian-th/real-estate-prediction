 #include "include/utils.h"
    #include <string.h> // For strncpy
    #include <stdio.h>  // For snprintf if used

    void safe_strncpy(char *dest, const char *src, size_t dest_size) {
        if (!dest || dest_size == 0) return;
        if (!src) {
            dest[0] = '\\0';
            return;
        }
        strncpy(dest, src, dest_size - 1);
        dest[dest_size - 1] = '\\0'; // Ensure null termination
    }
