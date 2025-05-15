CC = gcc
CFLAGS = -Wall -g -Isrc/include
LDFLAGS = # -lpq -lmicrohttpd -ljansson (add these when implementing fully)
SRC_DIR = src
OBJ_DIR = obj
TARGET = moldova_insight_realty_api

# Find all .c files in src directory and its subdirectories
SOURCES = $(wildcard $(SRC_DIR)/*.c) $(wildcard $(SRC_DIR)/*/*.c)
OBJECTS = $(patsubst $(SRC_DIR)/%.c,$(OBJ_DIR)/%.o,$(SOURCES))

all: $(TARGET)

$(TARGET): $(OBJECTS)
		$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)
		@echo "C Backend (stub) executable created: $(TARGET)"

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c
		@mkdir -p $(@D)
		$(CC) $(CFLAGS) -c $< -o $@

clean:
		rm -rf $(OBJ_DIR) $(TARGET)
		@echo "Cleaned C backend objects and target."

run: $(TARGET)
		./$(TARGET)

.PHONY: all clean run
