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


Project Description v1

Moldova Insight Realty - Visual MVP & Full Implementation Plan
Project Title: Moldova Insight Realty (MVP)
Version: 1.1 (Visual MVP Focus for Presentation)
Date: May 15, 2025
Goal:
Immediate (for Presentation): To provide a step-by-step guide for an AI agent to develop a visually compelling and demonstratable frontend MVP. This version will simulate backend interactions and use mocked data to showcase core user flows and features.
Full (Post-Presentation): To outline the complete development of a functional Minimum Viable Product (MVP) of a web-based, non-profit platform providing transparent real estate data and basic predictive insights for Chișinău, Moldova, including the full C backend and database integration.
1. Overall Project Architecture & Technology Justification
The MVP consists of three main components, chosen for specific reasons:
Frontend (React):
Technology: React with Vite, Tailwind CSS, Recharts, Axios, React Router DOM.
Justification:
React: A leading JavaScript library for building dynamic and responsive user interfaces. Its component-based architecture promotes reusability and maintainability, crucial for scaling. The large community and ecosystem (e.g., Vite for fast builds) accelerate development.
Vite: Offers a significantly faster development experience (Hot Module Replacement, quick startup) compared to older bundlers, ideal for rapid prototyping and iteration.
Tailwind CSS: A utility-first CSS framework that allows for rapid UI development directly in the markup, ensuring consistency and a modern look with minimal custom CSS. This is key for quickly achieving a polished visual MVP.
Recharts: A composable charting library for React, perfect for visualizing price trends and predictions clearly and attractively.
Axios: A promise-based HTTP client for making API calls, simplifying asynchronous data fetching (even if initially mocked).
React Router DOM: Standard library for handling client-side routing in a React SPA, enabling a multi-page feel without full page reloads.
Backend (C Language):
Technology: C, libmicrohttpd, libpq, Jansson, (libbcrypt or Argon2 for hashing - SHA256+salt as interim for MVP).
Justification:
C Language: Chosen for its unparalleled performance, low-level control over system resources, and minimal overhead. For a data-intensive application aiming for scalability and efficiency, especially with complex calculations or large request volumes in the future, C provides a solid foundation. This choice directly addresses the project requirement for a significant C component and allows us to build a highly optimized core.
libmicrohttpd: A small, embeddable HTTP server library in C. It's lightweight and allows us to build a custom, efficient web server without the bloat of larger frameworks, fitting the C philosophy.
libpq: The official C API for PostgreSQL. It provides direct, efficient communication with the database, essential for performance.
Jansson: A C library for encoding, decoding, and manipulating JSON data. Crucial for handling API request and response payloads in a standard format.
Password Hashing Library (libbcrypt/Argon2): Essential for security. Using established libraries ensures robust hashing. (For the visual MVP's simulated backend, this won't be live, but the plan includes it for the full build).
Database (PostgreSQL):
Technology: PostgreSQL.
Justification: PostgreSQL is a powerful, open-source object-relational database system with a strong reputation for reliability, data integrity, and extensibility.
ACID Compliance: Ensures transactional integrity, critical for financial or user data.
Extensibility: Supports custom functions, diverse data types (including JSON and GIS via PostGIS extension for future geospatial features).
Scalability: Can handle large datasets and high concurrency.
PostGIS Extension (Future): While not in the immediate MVP, PostgreSQL's PostGIS extension is industry-leading for geospatial data, aligning with the project's potential to include map-based analysis.
Cost-Effective: Being open-source, it avoids licensing fees, fitting the non-profit nature of the project.
Pre-installed: Its availability on the development PC simplifies setup for the full implementation.
Interaction Flow (Full System):
User interacts with React Frontend -> Frontend makes API calls (JSON) to C Backend -> C Backend processes requests, interacts with PostgreSQL DB -> C Backend sends JSON responses to Frontend.
Interaction Flow (Visual MVP for Presentation):
User interacts with React Frontend -> Frontend simulates API calls and uses mocked data/responses to display UI elements and features. The C backend structure will exist, but no live interaction will occur for the demo.
2. Phase 1 (IMMEDIATE): Visual MVP for Presentation - AI Agent Steps
Goal: Create a visually appealing React frontend that simulates the core functionalities using mocked data. Create the C backend file structure and stubs.
2.1. Project Directory Structure Setup
The AI agent should create the complete directory structure as defined in the original plan (Section 2 of the full plan document provided previously). This shows completeness even if not all C files are filled.
moldova-insight-realty-mvp/
├── backend-c/
│   ├── src/
│   │   ├── include/
│   │   │   ├── db.h
│   │   │   ├── auth.h
│   │   │   ├── districts.h
│   │   │   ├── properties.h
│   │   │   ├── user_dashboard.h
│   │   │   ├── api_handler.h
│   │   │   └── utils.h
│   │   ├── main.c
│   │   ├── utils.c
│   │   ├── db.c
│   │   ├── auth.c
│   │   ├── districts.c
│   │   ├── properties.c
│   │   ├── user_dashboard.c
│   │   └── api_handler.c
│   ├── sql/
│   │   ├── 001_schema.sql       # Create this file (content from full plan)
│   │   └── 002_sample_data.sql  # Create this file (content from full plan)
│   ├── Makefile                 # Create this file (content from full plan, but won't be run for visual MVP)
│   └── README.md
└── frontend-react/
    # ... (standard React project structure from Vite)

2.2. Backend (C) - Visual MVP Task
Create all .h and .c files listed in the backend-c/src/ and backend-c/src/include/ directories.
Populate header files (.h) with the function declarations and struct definitions as outlined in the full plan (Sections 4.2 - 4.8).
Populate source files (.c) with empty or stubbed function implementations. For example:
// Example for db.c
#include "include/db.h"
#include <stdio.h> // For printf in stubs

PGconn* db_connect(const char *conn_info_str) {
    printf("[STUB] db_connect called with: %s\n", conn_info_str);
    return NULL; // Stub
}
void db_disconnect(PGconn *conn) {
    printf("[STUB] db_disconnect called.\n");
}
// ... other stubbed functions ...

Create the Makefile as defined in the full plan. It won't be used to compile a working backend for the demo, but its presence shows completeness of the plan.
Create 001_schema.sql and 002_sample_data.sql with the content from the full plan. These define the target database structure and sample data that the frontend will mock.
Justification for this approach: This creates the illusion of a developed C backend structure for presentation purposes, fulfilling the requirement to show C components, without needing to implement complex C logic under extreme time pressure.
2.3. Frontend (React) - Visual MVP Task (Primary Focus)
Setup: Initialize React project with Vite and install dependencies (react-router-dom, axios, recharts, lucide-react, tailwindcss) as per Section 2.2 of the full plan. Configure Tailwind CSS.
Mock Data (frontend-react/src/services/mockData.js):
Create a mockData.js file.
Define JavaScript objects and arrays that simulate the data that would come from the API. This data should align with the 001_schema.sql and 002_sample_data.sql structures.
Include:
An array of 20-30 sample property listings for Chișinău with diverse characteristics (district, rooms, price, simulated historical date_listed values for trends).
Sample district information (name, description, amenities).
Sample historical price trend data for a few district/room combinations (e.g., arrays of {date: 'YYYY-MM', price: XXXX}).
Sample prediction data (e.g., { prediction_6m: YYYY, prediction_12m: ZZZZ }).
A mock user object.
API Service Module (frontend-react/src/services/api.js):
Create functions for all defined API endpoints (Section 4.10 of the full plan).
Instead of making axios calls, these functions will return Promises that resolve with data from mockData.js after a short simulated delay (e.g., setTimeout).
Example:
// src/services/api.js
import { mockProperties, mockTrendsBotanica2Rooms, mockPredictionBotanica2Rooms, mockDistricts } from './mockData';

const MOCK_API_DELAY = 500; // ms

export const getProperties = (filters) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mock API: getProperties called with filters:", filters);
            // Add basic filtering logic on mockProperties if time permits
            resolve(mockProperties);
        }, MOCK_API_DELAY);
    });
};

export const getPriceTrends = (districtId, numRooms, timeRange) => {
     return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mock API: getPriceTrends for district:", districtId, "rooms:", numRooms);
            // Return specific mock trend based on params if possible
            resolve(mockTrendsBotanica2Rooms);
        }, MOCK_API_DELAY);
    });
};
// ... other mocked API functions for districts, predictions, auth, dashboard ...
export const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "demo@example.com" && password === "password123") {
                resolve({ userId: "mock-user-id-123", message: "Login successful (mocked)" });
            } else {
                reject({ message: "Invalid credentials (mocked)" });
            }
        }, MOCK_API_DELAY);
    });
};

Implement all React Components and Pages (Sections 5.2 - 5.7 of the full plan):
AuthContext.js: Manage a mock isAuthenticated state. login function should call the mocked loginUser from api.js and update context.
Routing (App.js): Set up all routes.
UI Components (Button, Card, etc.): Style with Tailwind for a polished look.
Layout Components (Navbar, Footer).
Page Components:
Fetch data using the mocked API service functions.
Display data attractively.
PropertiesPage.jsx: Show filtering options (even if filtering logic on mock data is basic). Display property cards.
TrendsPredictionsPage.jsx: Use Recharts to display line graphs based on mocked trend data. Display mocked prediction values.
DashboardPage.jsx: Simulate adding/viewing saved searches using local component state or context for the demo.
Styling: Focus on making the UI look clean, modern, and professional using Tailwind CSS. Ensure good visual hierarchy and readability.
Simulated Case for Demo:
Hardcode or ensure your mockData.js supports a clear demo path. For example, ensure there's good trend data for "Botanica, 2 rooms" so you can demonstrate that flow clearly.
The login can work with a predefined mock user (e.g., demo@example.com / password123).
Justification for this Visual MVP approach: This allows for a highly polished and interactive frontend demo within a very short timeframe. It showcases the intended user experience, data visualization capabilities, and core features without the complexity of a fully implemented backend. The mocked API calls with delays give a semblance of real-world application behavior.
3. Phase 2 (POST-PRESENTATION): Full MVP Implementation - AI Agent Steps
This phase involves building out the full functionality as originally planned.
3.1. Database Setup (Full)
Ensure PostgreSQL is running.
Execute backend-c/sql/001_schema.sql to create the database structure.
Execute backend-c/sql/002_sample_data.sql to populate the database with initial data.
Refinement: The AI agent might need to generate a more extensive and varied 002_sample_data.sql script for robust backend testing.
3.2. Backend Implementation (C) - Full Logic
Implement all C functions in db.c, auth.c, districts.c, properties.c, user_dashboard.c, api_handler.c, and utils.c as per the detailed specifications in Sections 4.2 - 4.9 of the full plan.
Replace all stubbed functions with actual logic.
Implement proper error handling and resource management (e.g., freeing allocated memory, closing database connections if not using a persistent pool).
Implement actual password hashing using the chosen library (e.g., libbcrypt or Argon2).
Implement the basic linear regression model in C for predictions.
Thoroughly test database interactions.
Implement JSON parsing from request bodies and JSON generation for responses using Jansson.
Implement routing logic in api_handler.c to connect API endpoints to their respective service functions.
Compile the C backend using the Makefile. Debug any compilation or linking issues.
3.3. Frontend (React) - Integration with Live Backend
Modify frontend-react/src/services/api.js.
Replace all mocked API calls with actual axios (or fetch) calls to the live C backend API endpoints.
Ensure the baseURL for axios points to the running C backend server (e.g., http://localhost:PORT_YOUR_C_SERVER_RUNS_ON/api).
Handle API responses and errors robustly. Update UI based on live data.
3.4. Integration Testing & Refinement (Full)
Thoroughly test the end-to-end flow: React Frontend <-> C Backend API <-> PostgreSQL Database.
Test all functionalities: user registration, login, property listing & filtering, district info display, price trend visualization (with real aggregated data), price predictions (from C model), user dashboard functionality.
Debug issues across the stack.
Perform basic performance testing and identify any bottlenecks.
3.5. Documentation & Final Touches (Full)
Update all README.md files with complete setup, compilation, and running instructions for the full system.
Ensure C code and React code are well-commented.
Prepare for potential deployment (Section 8 of the full plan).
This revised plan provides a clear path for the AI agent: first, to rapidly create a visually impressive demo for the presentation, and second, to complete the full, functional MVP development afterward. The technology choices are justified based on performance, scalability, ecosystem, and project requirements.



Project Description v2

Moldova Insight Realty - Impressive Student MVP: Implementation Plan
Project Title: Moldova Insight Realty (Student MVP)
Version: 1.2 (Visual MVP for Presentation: ~30 mins; Full MVP Build: ~2 days)
Date: May 15, 2025
Goal:
Immediate (for Presentation - ~30 minutes): To provide a step-by-step guide for an AI agent to develop a visually compelling and polished React frontend demo. This version will simulate backend interactions using mocked data to showcase core user flows and features effectively. The C backend's file structure will be created to demonstrate architectural planning.
Full (Post-Presentation - ~2 days): To outline the AI-driven development of a functional Minimum Viable Product (MVP). This includes implementing the C backend for core functionalities (API handling, database interaction, basic predictions) and integrating it with the React frontend and PostgreSQL database. The aim is an impressive student project demonstrating key software engineering principles.
1. Overall Project Architecture & Technology Justification
The MVP will feature a three-tier architecture, with technology choices emphasizing a balance of performance, modern development practices, and meeting project requirements (notably the C component).
Frontend (React):
Technology: React with Vite, Tailwind CSS, Recharts, Axios, React Router DOM.
Justification:
React & Vite: Chosen for rapid UI development, a vast ecosystem, and excellent performance. React's component model facilitates a modular and maintainable frontend, while Vite ensures a fast development cycle – critical for quick results.
Tailwind CSS: Enables the creation of a modern, responsive, and visually appealing UI with high efficiency, directly within the HTML structure. This is key for achieving a polished look for the visual MVP in a short time.
Recharts: A straightforward and powerful library for rendering interactive charts (e.g., price trends), vital for data presentation.
Axios & React Router DOM: Standard, reliable choices for API communication and client-side navigation, respectively.
Backend (C Language):
Technology: C, libmicrohttpd (or similar lightweight C HTTP library), libpq (PostgreSQL C API), Jansson (for JSON). For password hashing, a simple interim solution (e.g., SHA256 with salt, clearly documented as for MVP) will be used if a full library like libbcrypt/Argon2 proves too complex for the AI to integrate quickly for the 2-day full build.
Justification:
C Language: This is a core project requirement and a key differentiator. Using C for the backend demonstrates an understanding of lower-level programming, performance considerations, and resource management. It allows for a highly efficient, custom-built API layer. For the "impressive student project" aspect, a functional C backend handling core logic is a significant achievement.
Lightweight HTTP Library (e.g., libmicrohttpd): Keeps the C backend lean and focused, avoiding the overhead of larger frameworks and aligning with the C philosophy of direct control.
libpq & Jansson: Provide direct, efficient database communication and standardized JSON handling, respectively – essential for any web API.
Database (PostgreSQL):
Technology: PostgreSQL.
Justification:
Robustness & Reliability: PostgreSQL is a mature, enterprise-grade open-source RDBMS known for data integrity (ACID compliance) and a rich feature set.
Data Types & Extensibility: Excellent support for various data types, including JSON, and future potential for geospatial analysis with PostGIS (though PostGIS itself might be out of scope for the 2-day full build, mentioning it shows foresight).
Performance: Handles complex queries and data volumes well.
Cost-Effective & Available: Open-source and pre-installed on the development PC, simplifying setup for the AI agent. Using an industry-standard database is an impressive choice for a student project.
Interaction Flow (Full System - 2 Day Build):
User interacts with React Frontend -> Frontend makes API calls (JSON) to C Backend -> C Backend processes requests, interacts with PostgreSQL DB (executing queries, basic data aggregation, simple predictions) -> C Backend sends JSON responses to Frontend.
Interaction Flow (Visual MVP for Presentation - 30 Min Build):
User interacts with React Frontend -> Frontend simulates API calls and uses internally mocked data/responses to display UI elements and features. The C backend file structure will be created by the AI to show planning, but no live C code will be executed during this demo.
2. Phase 1 (IMMEDIATE ~30 mins): Visual MVP for Presentation - AI Agent Steps
Goal: AI agent to create a visually stunning and interactive React frontend demo using mocked data. AI agent to also create the C backend file structure with stubs.
2.1. Project Directory Structure Setup (AI Task)
AI to create the complete directory structure as previously defined (see moldova_insight_realty_impl_plan v1.1, Section 2.1). This includes all backend-c subdirectories and empty/stubbed files.
2.2. Backend (C) - Visual MVP Task (AI Task - Structure Only)
AI to create all .h and .c files in backend-c/src/ and backend-c/src/include/.
AI to populate header files (.h) with function declarations (as per previous plan).
AI to populate source files (.c) with empty or simple printf("[STUB] FunctionName called"); return NULL; style stubs.
AI to create the Makefile (as per previous plan, for show) and the SQL files (001_schema.sql, 002_sample_data.sql - content from previous plan).
Rationale: This quickly establishes the planned C architecture for the presentation, demonstrating foresight without requiring immediate C compilation or logic for the 30-min demo.
2.3. Frontend (React) - Visual MVP Task (AI Task - Primary Focus for 30 mins)
Setup: AI to initialize React project (Vite) and install/configure all frontend dependencies (Tailwind, Recharts, Axios, React Router DOM).
Mock Data (frontend-react/src/services/mockData.js) (AI Task):
AI to create this file with JavaScript objects/arrays simulating API responses for:
~20-30 sample Chișinău property listings (district, rooms, price, historical date_listed).
Sample district info (name, description).
Sample historical price trend data for 2-3 specific district/room combinations (e.g., {date: 'YYYY-MM', price: XXXX}).
Sample prediction data (e.g., { prediction_6m: XXXX, prediction_12m: YYYY }).
A mock user object for simulated login.
Crucial: Data should be tailored to create a smooth demo flow for 1-2 specific examples (e.g., showing trends for "Botanica, 2 rooms").
API Service Module (frontend-react/src/services/api.js) (AI Task):
AI to create functions for API endpoints.
These functions must return Promises resolving with data from mockData.js after a setTimeout (e.g., 300-500ms) to simulate network latency.
Implement a mock loginUser function that "succeeds" for predefined demo credentials (e.g., demo@example.com, password123).
React Components & Pages (AI Task):
AI to implement all necessary React components (UI, Layout, Pages) as outlined previously.
Styling is KEY: AI must use Tailwind CSS effectively to create a very polished, modern, and professional-looking UI. Visual appeal is paramount for the 30-min demo.
PropertiesPage.jsx: Filters should be present in the UI; actual filtering of mock data can be basic or even just visual.
TrendsPredictionsPage.jsx: Recharts must be used to display attractive line graphs from the mocked trend data. Predictions should be clearly displayed.
DashboardPage.jsx: Simulate saved searches using local state for the demo.
Demo Flow: The AI should ensure the mock data and UI components support a fluid demonstration of:
Logging in (simulated).
Viewing property listings.
Selecting a specific property type/district.
Viewing its historical price trend graph.
Seeing a (mocked) price prediction.
(Optional) Adding it to a "dashboard."
Justification for Visual MVP approach: This focuses AI effort on creating a high-impact visual demo. The frontend will look and feel like a working application, which is essential for impressing in a short presentation. The C backend structure shows intent and planning.
3. Phase 2 (POST-PRESENTATION ~2 days): Full MVP Implementation - AI Agent Steps
Goal: AI agent to implement the C backend, connect it to PostgreSQL, and integrate it with the already polished React frontend.
3.1. Database Setup (Full) (AI Task)
AI to ensure PostgreSQL is accessible.
AI to execute backend-c/sql/001_schema.sql to create tables.
AI to execute backend-c/sql/002_sample_data.sql to populate with data.
Note for AI: The sample data should be sufficient to test all backend logic, especially for trends and basic predictions.
3.2. Backend Implementation (C) - Core Logic (AI Task - Major Focus for 2 days)
Implement C functions in db.c, auth.c, districts.c, properties.c, user_dashboard.c, api_handler.c, utils.c.
db.c: Fully implement PostgreSQL connection (PQconnectdb, PQfinish), query execution (PQexecParams, PQexec), and result processing (PQgetvalue, PQntuples, PQnfields, PQclear). Handle connection errors.
auth.c: Implement user registration (check email, hash password with SHA256+salt for MVP, insert user) and login (fetch user, verify hashed password).
districts.c: Fetch and return district data as JSON using Jansson.
properties.c:
Implement property fetching with basic filtering (district, rooms).
Implement historical trend aggregation: query properties table, group by month/year, calculate average price for selected district/rooms. Return as JSON.
Implement basic price prediction in C:
Fetch historical monthly average prices (from above).
Implement a simple linear regression model (calculate slope m and intercept b from the historical monthly averages).
Forecast for the next 6 and 12 months. This is a key "impressive" C component.
Return predictions as JSON.
user_dashboard.c: Implement CRUD for user_saved_searches linked to user_id.
api_handler.c: Implement full request routing (parsing URL, method), JSON body parsing (Jansson), calling appropriate service functions, and constructing Jansson JSON responses with correct HTTP status codes and CORS headers.
main.c: Start libmicrohttpd server, handle graceful shutdown.
Compilation (AI Task): AI to use the Makefile to compile the C backend. AI to debug any compilation/linking issues.
3.3. Frontend (React) - Integration (AI Task)
AI to modify frontend-react/src/services/api.js.
Replace all mocked API functions with actual axios calls to the live C backend API.
Ensure baseURL points to the running C backend.
AI to adapt frontend components to handle live data structures and potential API errors gracefully.
3.4. Integration Testing & Refinement (Full) (AI Task)
AI to test the end-to-end flow thoroughly.
Verify all features: registration, login, property views, filtering, live trend graphs from DB, live predictions from C model, dashboard.
The AI should be prompted to identify and fix bugs across the stack.
3.5. Documentation & Final Touches (Full) (AI Task)
AI to ensure README.md files are updated for both backend and frontend with setup and run instructions.
AI to add comments to key C functions and React components explaining their logic.
4. Future Enhancements (For the Report - Conceptual)
To make the project truly stand out in the report (beyond the 2-day build):
Advanced ML Models: Discuss integrating Python-based ML services (e.g., using Flask/FastAPI with Scikit-learn/XGBoost/Prophet) for more sophisticated predictions, potentially calling this service from the C backend.
Live Data Scraping: Detail a plan for a Python-based scraping module (Scrapy/BeautifulSoup) for sites like 999.md.
In-depth Investment & Mortgage Tools: Conceptually outline how these advanced features (NPV, IRR, detailed mortgage calculations) could be added.
PostGIS for Geospatial Analysis: Explain how PostGIS could enable map-based searches for amenities, proximity calculations, etc.
Robust Security: Discuss upgrading password hashing to Argon2/bcrypt and implementing JWT for session management.
This revised plan gives the AI agent a clear, phased approach. The immediate focus is a stunning visual demo. The 2-day goal is a functional C-backed MVP that's impressive for a student project. The "Future Enhancements" section allows you to discuss more advanced concepts in your report, showing broader vision.