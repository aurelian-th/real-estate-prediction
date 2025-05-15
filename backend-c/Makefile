# Moldova Insight Realty - Backend C Makefile

CC = gcc
CFLAGS = -I./src/include -Wall -Wextra -g -std=c11
LDFLAGS = -lmicrohttpd -lpq -ljansson -lcrypto -lm

# Directories
SRC_DIR = src
OBJ_DIR = obj
BIN_DIR = bin

# Source files
SRC = $(SRC_DIR)/main.c \
      $(SRC_DIR)/utils.c \
      $(SRC_DIR)/db.c \
      $(SRC_DIR)/auth.c \
      $(SRC_DIR)/districts.c \
      $(SRC_DIR)/properties.c \
      $(SRC_DIR)/user_dashboard.c \
      $(SRC_DIR)/prediction.c \
      $(SRC_DIR)/api_handler.c

# Object files
OBJ = $(patsubst $(SRC_DIR)/%.c, $(OBJ_DIR)/%.o, $(SRC))

# Main executable
TARGET = $(BIN_DIR)/moldova_insight_backend

# Default target
all: directories $(TARGET)

# Create necessary directories
directories:
	@mkdir -p $(OBJ_DIR)
	@mkdir -p $(BIN_DIR)

# Link object files to create executable
$(TARGET): $(OBJ)
	$(CC) $(OBJ) -o $@ $(LDFLAGS)
	@echo "Build complete: $(TARGET)"

# Compile source files into object files
$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c
	$(CC) $(CFLAGS) -c $< -o $@

# Clean build artifacts
clean:
	rm -rf $(OBJ_DIR) $(BIN_DIR)
	@echo "Clean complete"

# Run the backend server
run: all
	./$(TARGET)

# Debug with GDB
debug: all
	gdb ./$(TARGET)

# Install dependencies (Debian/Ubuntu)
install-deps-debian:
	sudo apt update
	sudo apt install -y build-essential libmicrohttpd-dev libpq-dev libjansson-dev libssl-dev

# Install dependencies (macOS)
install-deps-mac:
	brew install libmicrohttpd postgresql jansson openssl

# Help target
help:
	@echo "Moldova Insight Realty Backend - Build System"
	@echo ""
	@echo "Available targets:"
	@echo "  all            - Build the backend (default)"
	@echo "  clean          - Remove build artifacts"
	@echo "  run            - Build and run the backend server"
	@echo "  debug          - Debug the backend with GDB"
	@echo "  install-deps-* - Install dependencies (debian or mac)"
	@echo "  help           - Show this help message"

.PHONY: all directories clean run debug install-deps-debian install-deps-mac help
