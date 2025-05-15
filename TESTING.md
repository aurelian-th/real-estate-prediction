# Moldova Insight Realty - Testing Guide

This document outlines the manual and automated testing procedures for the Moldova Insight Realty platform.

## Frontend Testing

### Manual Testing

#### 1. Navigation and Routing
- [ ] Home page loads correctly
- [ ] Navigation bar shows all required links
- [ ] Clicking on navigation links routes to the correct pages
- [ ] Back/forward browser navigation works as expected
- [ ] 404 page shows for invalid routes

#### 2. Property Listings
- [ ] Property listings load correctly
- [ ] Filtering by district works
- [ ] Filtering by number of rooms works
- [ ] Filtering by price range works
- [ ] Property cards display correct information
- [ ] Clicking on a property card navigates to the property detail page

#### 3. Property Details
- [ ] Property details page loads with correct information
- [ ] All property images are displayed
- [ ] Features list is correctly displayed
- [ ] Contact buttons function as expected
- [ ] "Save Property" button works (when logged in)
- [ ] "Save Property" redirects to login (when not logged in)

#### 4. Trends and Predictions
- [ ] Trends page loads with chart
- [ ] Selecting different districts updates the chart
- [ ] Selecting different room counts updates the chart
- [ ] Selecting different time ranges updates the chart
- [ ] Predictions section shows 6 and 12-month forecasts
- [ ] Information tooltip explains methodology

#### 5. Authentication
- [ ] Login form validates input
- [ ] Error messages display for invalid credentials
- [ ] Registration form validates all fields
- [ ] Successful login redirects to dashboard
- [ ] Logout functionality works

#### 6. User Dashboard
- [ ] Saved properties are correctly displayed
- [ ] Removing a saved property works
- [ ] Saved searches are correctly displayed
- [ ] Running a saved search works
- [ ] Deleting a saved search works

#### 7. Responsive Design
- [ ] Site displays correctly on desktop (1920px width)
- [ ] Site displays correctly on tablet (768px width)
- [ ] Site displays correctly on mobile (375px width)
- [ ] Navigation menu converts to hamburger on small screens
- [ ] Property cards stack on mobile view

### Automated Testing Tools (for future implementation)

- Unit Tests: React Testing Library + Jest
- E2E Tests: Cypress
- Visual Regression Tests: Percy

## Backend Testing (for full implementation)

### API Testing Checklist

#### 1. Properties Endpoints
- [ ] GET /api/properties returns list of properties
- [ ] GET /api/properties with filter params returns filtered list
- [ ] GET /api/properties/:id returns single property
- [ ] Error handling works for invalid property ID

#### 2. Districts Endpoints
- [ ] GET /api/districts returns list of districts
- [ ] GET /api/districts/:id returns single district
- [ ] GET /api/districts/:id/properties returns properties in district

#### 3. Authentication Endpoints
- [ ] POST /api/auth/login returns token for valid credentials
- [ ] POST /api/auth/login returns error for invalid credentials
- [ ] POST /api/auth/register creates new user and returns token
- [ ] Input validation rejects improper registration data

#### 4. User Endpoints
- [ ] GET /api/user/saved-properties returns user's saved properties
- [ ] POST /api/user/saved-properties adds property to saved list
- [ ] DELETE /api/user/saved-properties/:id removes property from saved list
- [ ] Authentication middleware blocks unauthenticated requests

#### 5. Trends and Predictions Endpoints
- [ ] GET /api/trends returns historical trend data
- [ ] GET /api/predictions returns prediction data
- [ ] Filtering by district and room count works

### Backend Testing Tools (for future implementation)

- Unit Tests: Check (C testing framework)
- API Tests: Postman or custom C test client
- Load Tests: Apache Benchmark (ab) or jMeter

## Frontend-Backend Integration Testing

- [ ] Frontend successfully connects to backend API endpoints
- [ ] API responses are correctly processed and displayed
- [ ] Error handling shows appropriate messages to users
- [ ] Authentication tokens are properly stored and sent with requests
- [ ] Real-time data updates work correctly

## Performance Testing Points

- [ ] Initial page load time < 2 seconds
- [ ] Time to interactive < 3 seconds
- [ ] Property listings load time < 1 second
- [ ] Chart rendering time < 500ms
- [ ] Backend API response time < 200ms

## Security Testing

- [ ] Authentication token validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Input validation on all forms
- [ ] Proper error handling (no sensitive data in errors)

## Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] All images have alt text
- [ ] Forms have proper labels and ARIA attributes

---

## Test Environment Setup

For the MVP, tests should be run against the development environment:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080/api

For the full implementation, separate test environments should be established.
