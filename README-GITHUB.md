# Moldova Insight Realty

<div align="center">
  <img src="frontend-react/public/favicon.svg" alt="Moldova Insight Realty Logo" width="100" />
  <h2>Moldova Insight Realty</h2>
  <p>A modern real estate data analytics platform for Chișinău, Moldova</p>
</div>

## 📋 Project Overview

Moldova Insight Realty is a web-based platform providing transparent real estate data and predictive insights for Chișinău, Moldova. The platform aims to bring transparency to the real estate market by providing comprehensive property listings, historical price trends, and data-driven predictions.

![Platform Preview](docs/platform-preview.png)

## 🚀 Features

- **Property Listings**: Browse properties across different districts of Chișinău
- **Property Details**: View detailed information about each property
- **Filtering & Search**: Find properties based on district, price range, number of rooms, etc.
- **Market Trends**: Visualize historical price trends by district and property type
- **Price Predictions**: View price forecasts based on historical data and linear regression
- **User Authentication**: Register and login to save properties and customize experience
- **User Dashboard**: Manage saved properties and searches

## 🛠️ Tech Stack

### Frontend
- **React**: Modern UI library for building the interface
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing
- **Recharts**: Responsive charting library for data visualization

### Backend
- **C Language**: High-performance backend implementation
- **libmicrohttpd**: Lightweight HTTP server library
- **libpq**: PostgreSQL client library
- **Jansson**: JSON parsing/generation library
- **OpenSSL**: For secure authentication

### Database
- **PostgreSQL**: Relational database for storing property data and user information

## 🏗️ Project Structure

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
└── backend-c/             # C backend implementation
    ├── src/               # C source files
    │   ├── include/       # Header files
    │   └── ...            # Implementation files
    └── sql/               # Database schema and sample data
```

## 📊 Prediction Algorithm

The platform uses a sophisticated linear regression model implemented in C to predict future property prices:

1. **Historical Data Analysis**: Aggregates property price data by district and room count
2. **Trend Calculation**: Identifies historical price trends over 24 months
3. **Regression Model**: Applies linear regression with seasonal adjustments to predict 6-month and 12-month prices
4. **Confidence Calculation**: Determines prediction confidence based on data quality, consistency, and sample size
5. **District Comparison**: Compares price trends and predictions across different districts

Key features of our prediction model:
- Seasonal adjustments based on the time of year
- Confidence level indicators to show reliability of predictions
- Visual indicators for growth rates
- Multi-district comparison charts

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- GCC compiler (for backend development)
- PostgreSQL

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/aurelian-th/real-estate-prediction.git
cd real-estate-prediction

# Install frontend dependencies
cd frontend-react
npm install

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend-c

# Install required libraries (Ubuntu/Debian)
sudo apt install libmicrohttpd-dev libpq-dev libjansson-dev libssl-dev

# Build the backend
make

# Run the server
./bin/moldova_insight_backend
```

## 📝 Documentation

- [Installation Guide](INSTALL.md)
- [Testing Guide](TESTING.md)
- [Project Notes](project-notes.md)
- [Demo Script](demo-script.md)

## 🔮 Future Enhancements

- Advanced ML models for more accurate predictions
- Live data scraping from Moldovan real estate sites
- Investment analysis tools
- Mobile application
- Map-based property search with PostGIS integration

## 👥 Contributors

- Aurelian TH - Project Lead

## 📄 License

This project is part of the SDA course at the Technical University of Moldova (May 2025).
