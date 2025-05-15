# Moldova Insight Realty - Installation Guide

This guide provides step-by-step instructions to set up both the frontend and backend components of the Moldova Insight Realty platform.

## Prerequisites

### For Frontend Development
- Node.js v18 or higher
- npm v9 or higher
- Git

### For Backend Development (Full Implementation)
- C compiler (GCC 9+ recommended)
- PostgreSQL 14+
- Development libraries:
  - libmicrohttpd (for HTTP server)
  - libpq (PostgreSQL client library)
  - jansson (JSON parsing library)
  - OpenSSL (for encryption)

## Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/moldova-insight-realty.git
   cd moldova-insight-realty
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend-react
   npm install
   ```

3. **Set up environment variables**
   - Copy the example environment file
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` with any necessary configuration

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at http://localhost:3000

## Backend Setup (Full Implementation)

1. **Install required libraries (Ubuntu/Debian)**
   ```bash
   sudo apt update
   sudo apt install -y build-essential libmicrohttpd-dev libpq-dev libjansson-dev libssl-dev
   ```

   **For macOS:**
   ```bash
   brew install libmicrohttpd postgresql jansson openssl
   ```

   **For Windows:**
   Install using MSYS2 or Windows Subsystem for Linux (WSL)

2. **Set up PostgreSQL database**
   ```bash
   # Login to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE moldova_insight_realty;
   
   # Connect to the new database
   \c moldova_insight_realty
   
   # Exit psql
   \q
   ```

3. **Initialize database schema and sample data**
   ```bash
   cd backend-c
   psql -U postgres -d moldova_insight_realty -f sql/001_schema.sql
   psql -U postgres -d moldova_insight_realty -f sql/002_sample_data.sql
   ```

4. **Build the backend**
   ```bash
   cd backend-c
   make
   ```

5. **Start the backend server**
   ```bash
   ./bin/moldova_insight_backend
   ```
   
   The backend API will be available at http://localhost:8080

## Running the Complete Stack

1. **Start the backend server**
   ```bash
   cd backend-c
   ./bin/moldova_insight_backend
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend-react
   npm run dev
   ```

3. **Access the application**
   Open your browser and navigate to http://localhost:3000

## Troubleshooting

### Frontend Issues

- **Port already in use**
  ```bash
  # Edit vite.config.js to use a different port
  # or kill the process using the current port
  lsof -i :3000
  kill -9 <PID>
  ```

- **Module not found errors**
  ```bash
  # Reinstall node modules
  rm -rf node_modules
  npm install
  ```

### Backend Issues

- **Database connection failed**
  - Check PostgreSQL is running
  - Verify database credentials
  - Ensure PostgreSQL client libraries are installed

- **Compilation errors**
  - Check that all required development libraries are installed
  - Verify compiler version: `gcc --version`

## Development Tips

### Frontend Development

- Use React Developer Tools browser extension for debugging
- Edit `.env` file to point to your backend API
- Run `npm run build` to create a production build

### Backend Development

- Use `valgrind` to check for memory leaks
- Run the server with `gdb` for debugging
- Check `backend-c/docs` for API documentation

## Deployment

For deployment instructions, refer to `deploy.sh` in the project root.

---

For more information, see the project documentation in the README.md file.
