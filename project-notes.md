# Moldova Insight Realty - Project Notes

## MVP Implementation Notes

### Frontend
- React with Vite for fast development experience
- Tailwind CSS for utility-first styling
- React Router for navigation
- Mock API layer for simulating backend interactions

### Backend (Visual MVP)
- C language with stub implementations
- Header files with function declarations
- Basic source files with printf stubs
- SQL files for database schema and sample data

### Future Implementation Tasks

#### Backend (C)
1. **Database Connection**
   - Implement db.c functions for connection pooling
   - Set up proper error handling

2. **API Endpoints**
   - Implement all endpoints in api_handler.c
   - Set up proper routing and HTTP handling with libmicrohttpd

3. **Data Services**
   - Implement properties.c for property listing and searching
   - Implement districts.c for district information
   - Implement user_dashboard.c for user-specific features

4. **Authentication**
   - Implement secure authentication in auth.c
   - Set up proper password hashing with bcrypt/Argon2

#### Machine Learning Model
1. **Historical Data Analysis**
   - Aggregate historical price data by district and room count
   - Calculate monthly averages and trends
   - Apply outlier detection to remove anomalous data points
   - Analyze sample size and data quality metrics

2. **Prediction Model**
   - ✅ Implement linear regression in C with seasonal adjustments
   - ✅ Calculate prediction confidence based on data quality metrics
   - ✅ Set up 6-month and 12-month forecasting
   - Add support for dynamic model retraining with new data

#### Testing
1. **Unit Tests**
   - Write tests for C backend functions
   - Set up test framework

2. **Integration Tests**
   - Test API endpoints with real database
   - Validate data flow

## Enhancement Ideas for Future Versions

1. **Advanced ML Models**
   - Add more sophisticated predictive models
   - Consider integration with Python ML services

2. **Live Data Scraping**
   - Implement a scraper for real estate listing sites
   - Set up automatic data updates

3. **Investment Tools**
   - Add ROI calculations
   - Implement mortgage calculators

4. **Map Integration**
   - Add interactive maps with property markers
   - Show district boundaries and points of interest

5. **Mobile App**
   - Develop a companion mobile app
   - Add mobile-specific features like location-based alerts
