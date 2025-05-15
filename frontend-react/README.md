# Moldova Insight Realty - Frontend

This is the React frontend for the Moldova Insight Realty MVP, a platform for real estate data analytics in Chișinău, Moldova.

## Features

- **Property Listings**: Browse properties across different districts of Chișinău
- **Property Details**: View detailed information about each property
- **Filtering & Search**: Find properties based on district, price range, number of rooms, etc.
- **Trends & Predictions**: Visualize historical price trends and future predictions
- **User Authentication**: Register and login to save properties and customize experience
- **User Dashboard**: Manage saved properties and searches

## Tech Stack

- **React**: UI library for building the user interface
- **React Router**: For navigation and routing
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library
- **Recharts**: Charting library for data visualization

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Application Structure

- `src/components`: Reusable UI components
- `src/pages`: Page components for different routes
- `src/contexts`: React context providers
- `src/services`: API service and mock data

## Note

This frontend is designed to work with a C backend (in the `backend-c` directory), but currently uses mocked data to simulate backend interactions for demonstration purposes.
