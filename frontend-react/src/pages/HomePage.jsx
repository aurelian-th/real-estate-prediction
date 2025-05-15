import React from 'react';
import { Link } from 'react-router-dom';
import { Home, TrendingUp, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { mockDistricts } from '../services/mockData';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Making Real Estate Transparent in Moldova
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Access reliable data, trends, and predictions to make informed property decisions in Chișinău.
              </p>
              <div className="flex flex-wrap gap-4">                <Link to="/properties">
                  <Button 
                    variant="outline" 
                    className="bg-white text-blue-700 border-white hover:bg-blue-50"
                    size="lg"
                  >
                    <Home size={20} className="mr-2" />
                    Browse Properties
                  </Button>
                </Link>
                <Link to="/trends-predictions">
                  <Button 
                    variant="outline" 
                    className="border-white hover:bg-blue-800"
                    size="lg"
                  >
                    <TrendingUp size={20} className="mr-2" />
                    View Market Trends
                  </Button>
                </Link>
              </div>
            </div>
              <div className="hidden md:block">
              {/* City skyline image */}
              <img 
                src="/city-skyline.svg" 
                alt="Chișinău city skyline" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Search Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Explore Chișinău Districts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover real estate opportunities across different areas of the city
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockDistricts.map((district) => (
              <Link 
                to={`/properties?district=${district.id}`} 
                key={district.id}
              >
                <Card className="h-full hover:shadow-lg transition duration-300">
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{district.name}</h3>
                    <p className="text-gray-600 mb-3">
                      {district.avg_price_per_sqm} €/m²
                    </p>
                    <div className="text-blue-600 flex items-center justify-center">
                      <Search size={16} className="mr-1" />
                      View Properties
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Why Moldova Insight Realty?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides transparent real estate data to help you make informed decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="h-full">
              <Card.Body className="text-center">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-blue-600" />
                </div>
                <Card.Title>Property Database</Card.Title>
                <p className="text-gray-600 mt-2">
                  Access our comprehensive database of properties across Chișinău with detailed information and pricing.
                </p>
              </Card.Body>
            </Card>

            <Card className="h-full">
              <Card.Body className="text-center">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp size={24} className="text-blue-600" />
                </div>
                <Card.Title>Price Trends</Card.Title>
                <p className="text-gray-600 mt-2">
                  Analyze historical price data to understand market dynamics and identify the right time to buy or sell.
                </p>
              </Card.Body>
            </Card>

            <Card className="h-full">
              <Card.Body className="text-center">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Home size={24} className="text-blue-600" />
                </div>
                <Card.Title>Personalized Dashboard</Card.Title>
                <p className="text-gray-600 mt-2">
                  Save your favorite properties and searches to track them over time and receive updates.
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to explore the real estate market?
          </h2>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Create an account to save properties, track price changes, and get personalized recommendations.
          </p>
          <Link to="/register">
            <Button 
              variant="primary" 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
