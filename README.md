# Moldova Insight Realty MVP

<div align="center">
  <img src="frontend-react/public/favicon.svg" alt="Moldova Insight Realty Logo" width="100" />
  <h2>Moldova Insight Realty</h2>
  <p>A modern real estate data analytics platform for Chișinău, Moldova</p>
</div>

## 📋 Overview

Moldova Insight Realty is a web-based platform providing transparent real estate data and predictive insights for Chișinău, Moldova. This MVP (Minimum Viable Product) demonstrates the core functionality and user experience of the platform.

## 🏠 Features

- **Property Listings**: Browse properties across different districts of Chișinău
- **Property Details**: View detailed information about each property
- **Filtering & Search**: Find properties based on district, price range, number of rooms, etc.
- **Market Trends**: Visualize historical price trends by district and property type
- **Price Predictions**: View price forecast based on historical data
- **User Authentication**: Register and login to save properties and customize experience
- **User Dashboard**: Manage saved properties and searches

## 🛠️ Tech Stack

### Frontend
- **React**: Modern UI library for building the interface
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing
- **Recharts**: Responsive charting library for data visualization

### Backend (Visual MVP)
- **C Language**: Structured with stub implementations for demonstration
- **PostgreSQL**: Database schema designed but not connected in the MVP

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Web browser

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/moldova-insight-realty.git
   cd moldova-insight-realty
   ```

2. Start the frontend application
   ```
   cd frontend-react
   npm install
   npm run dev
   ```

3. Open your browser at http://localhost:3000

## 🔍 Project Structure

```
moldova-insight-realty/
├── frontend-react/        # React frontend application
│   ├── src/               # Source code
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (auth, etc.)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services and mock data
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
└── backend-c/             # C backend structure (stubbed)
    ├── src/               # C source files
    │   ├── include/       # Header files
    │   └── ...            # Implementation files
    └── sql/               # Database schema and sample data
```

## 📝 Project Documentation

- `demo-script.md`: Walkthrough for demonstrating the application
- `project-notes.md`: Notes on future development plans

## 📊 Demonstration

The MVP is configured with demo data to showcase the following:
- Browsing properties in different districts of Chișinău
- Filtering properties by various criteria
- Viewing property details and saving favorites
- Exploring price trends and predictions
- User authentication and dashboard features

## 🔮 Future Development

The full implementation plan includes:
1. Implementing the C backend with all defined endpoints
2. Connecting to a PostgreSQL database
3. Adding more sophisticated ML prediction models
4. Implementing live data scraping from real estate websites
5. Adding investment analysis tools

## 📄 License

This project is a student assignment at the Technical University of Moldova. Copyright 2025.

## 🙏 Acknowledgments

- Technical University of Moldova
- Faculty of Software Engineering
- Data Structures and Algorithms course
