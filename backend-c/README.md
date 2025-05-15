# Moldova Insight Realty - MVP Backend (C)

This folder contains the C backend structure for the Moldova Insight Realty MVP. For the visual MVP, these files are stubs and for demonstration only.

## Directory Structure

- `src/include/`: Header files for each backend module
- `src/`: Source files for each backend module
- `sql/`: Database schema and sample data
- `Makefile`: Build instructions (for full implementation)

## API Endpoints

### Properties

- `GET /api/properties` - List all properties
  - Query params: `district_id`, `rooms`, `min_price`, `max_price`
  - Returns: Array of property objects

- `GET /api/properties/:id` - Get a specific property
  - Returns: Single property object with full details

### Districts

- `GET /api/districts` - List all districts
  - Returns: Array of district objects with basic info

- `GET /api/districts/:id` - Get a specific district
  - Returns: Single district object with full details

- `GET /api/districts/:id/properties` - List properties in a district
  - Returns: Array of property objects for the specified district

### Analytics

- `GET /api/trends` - Get price trends
  - Query params: `district_id`, `room_count`, `time_range`
  - Returns: Array of trend data points

- `GET /api/predictions` - Get price predictions
  - Query params: `district_id`, `room_count`
  - Returns: Prediction object with 6-month and 12-month forecasts

### Authentication

- `POST /api/auth/login` - User login
  - Body: `{ "email": "...", "password": "..." }`
  - Returns: User object and authentication token

- `POST /api/auth/register` - User registration
  - Body: `{ "email": "...", "password": "...", "first_name": "...", "last_name": "..." }`
  - Returns: User object and authentication token

### User Dashboard

- `GET /api/user/saved-properties` - Get user's saved properties
  - Returns: Array of property objects saved by the user

- `POST /api/user/saved-properties` - Save a property
  - Body: `{ "property_id": 123 }`
  - Returns: Success message

- `DELETE /api/user/saved-properties/:id` - Remove a saved property
  - Returns: Success message

- `GET /api/user/saved-searches` - Get user's saved searches
  - Returns: Array of saved search objects

- `POST /api/user/saved-searches` - Save a search
  - Body: `{ "name": "...", "filters": {...} }`
  - Returns: Success message and saved search object

- `DELETE /api/user/saved-searches/:id` - Delete a saved search
  - Returns: Success message

## Implementation Details

### Module Responsibilities

- **api_handler**: HTTP request routing and response handling
- **properties**: Property listing, searching, and filtering
- **districts**: District information and related properties
- **auth**: User authentication and registration
- **user_dashboard**: User's saved properties and searches
- **db**: Database connection and query execution
- **utils**: Utility functions for common tasks

### Database Schema

The database schema (in `sql/001_schema.sql`) includes tables for:

- Users
- Districts
- Properties
- Property images
- Property features
- Saved searches
- Saved properties
- Price history
- Price predictions

## Building and Running (Full Implementation)

```bash
# Build
make

# Run
./bin/moldova_insight_backend
```

## Project Description

### Moldova Insight Realty - Visual MVP & Full Implementation Plan

**Project Title:** Moldova Insight Realty (MVP)  
**Version:** 1.2 (Visual MVP for Presentation; Full MVP Build)  
**Date:** May 15, 2025

#### Goal
- **Immediate (for Presentation):** Develop a visually compelling and demonstratable frontend MVP. This version will simulate backend interactions and use mocked data to showcase core user flows and features.
- **Full (Post-Presentation):** Outline the complete development of a functional Minimum Viable Product (MVP) of a web-based, non-profit platform providing transparent real estate data and basic predictive insights for Chișinău, Moldova, including the full C backend and database integration.

## Technology Stack

### Backend (C Language)
- **C Language:** Unparalleled performance, low-level control, minimal overhead. Ideal for data-intensive, scalable, efficient apps. Satisfies project C requirement.
- **libmicrohttpd:** Lightweight HTTP server library in C, custom/efficient web server.
- **libpq:** Official C API for PostgreSQL, direct/efficient DB communication.
- **Jansson:** C library for JSON encoding/decoding, standard API payloads.
- **Password Hashing Library:** Security (libbcrypt/Argon2). For visual MVP, not live, but planned for full build.

### Database (PostgreSQL)
- **Robust, open-source, reliable, extensible.**
- **ACID compliance:** Transactional integrity.
- **Extensibility:** Custom functions, diverse types (JSON, GIS via PostGIS for future geospatial features).
- **Scalability:** Handles large datasets, high concurrency.
- **PostGIS (Future):** Industry-leading for geospatial data, aligns with map-based analysis potential.
- **Cost-effective:** Open-source, no licensing fees, fits non-profit.

## Future Enhancements

- **Advanced ML Models:** Integrate Python-based ML services (e.g., using Flask/FastAPI with Scikit-learn/XGBoost/Prophet) for more sophisticated predictions, potentially calling this service from the C backend.
- **Live Data Scraping:** Implement a Python-based scraping module (Scrapy/BeautifulSoup) for sites like 999.md.
- **In-depth Investment & Mortgage Tools:** Add advanced features (NPV, IRR, detailed mortgage calculations).
- **PostGIS for Geospatial Analysis:** Leverage PostGIS to enable map-based searches for amenities, proximity calculations, etc.
- **Robust Security:** Upgrade password hashing to Argon2/bcrypt and implement JWT for session management.