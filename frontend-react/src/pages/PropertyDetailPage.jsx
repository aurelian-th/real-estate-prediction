import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Home, Maximize, Calendar, Euro, Heart, Share2, ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getPropertyById, saveProperty, unsaveProperty } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  const { isAuthenticated } = useAuth();
  
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  
  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getPropertyById(propertyId);
        setProperty(data);
        
        // Check if property is in saved list (mock for demo)
        // In a real app, this would be determined from the user's saved properties
        const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
        setIsSaved(savedProperties.includes(Number(propertyId)));
      } catch (err) {
        console.error('Error fetching property details:', err);
        setError('Failed to load property details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPropertyDetails();
  }, [propertyId]);
  
  // Handle save/unsave property
  const toggleSaveProperty = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = `/login?redirect=/properties/${propertyId}`;
      return;
    }
    
    try {
      if (isSaved) {
        await unsaveProperty(propertyId);
        
        // Update local storage (for demo purposes)
        const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
        localStorage.setItem('savedProperties', JSON.stringify(
          savedProperties.filter(id => id !== Number(propertyId))
        ));
      } else {
        await saveProperty(propertyId);
        
        // Update local storage (for demo purposes)
        const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
        savedProperties.push(Number(propertyId));
        localStorage.setItem('savedProperties', JSON.stringify(savedProperties));
      }
      
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Error toggling save status:', err);
      alert('Failed to update saved status');
    }
  };
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading property details...</p>
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error || 'Property not found'}</span>
        </div>
        <Link to="/properties" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-1" />
          Back to Properties
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link to="/properties" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <ArrowLeft size={16} className="mr-1" />
        Back to Properties
      </Link>
      
      {/* Property Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
      
      {/* Property Location */}
      <div className="flex items-center text-gray-600 mb-6">
        <MapPin size={18} className="mr-1" />
        <span>{property.address}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2">
          {/* Property Images */}
          <Card className="mb-8">
            {/* Image placeholder */}
            <div className="bg-gray-300 h-96 flex items-center justify-center">
              <Home size={64} className="text-gray-400" />
            </div>
          </Card>
          
          {/* Property Description */}
          <Card className="mb-8">
            <Card.Header>
              <h2 className="text-xl font-semibold">Description</h2>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-700 whitespace-pre-line">
                {property.description}
              </p>
              
              {/* Features/Amenities */}
              {property.features && property.features.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
          
          {/* Location */}
          <Card className="mb-8">
            <Card.Header>
              <h2 className="text-xl font-semibold">Location</h2>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-700 mb-4">
                This property is located in the {property.district_name} district of Chișinău, 
                known for its excellent amenities and accessibility.
              </p>
              
              {/* Map placeholder */}
              <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Map View (Placeholder)</span>
              </div>
            </Card.Body>
          </Card>
        </div>
        
        {/* Sidebar Column */}
        <div>
          {/* Price Card */}
          <Card className="mb-6">
            <Card.Body>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    €{property.price.toLocaleString()}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    €{Math.round(property.price / property.area_sqm).toLocaleString()}/m²
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className={`p-2 rounded-full ${isSaved ? 'text-red-500 bg-red-50' : 'text-gray-400 bg-gray-100 hover:text-gray-600'}`}
                    onClick={toggleSaveProperty}
                  >
                    <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
                  </button>
                  <button 
                    className="p-2 rounded-full text-gray-400 bg-gray-100 hover:text-gray-600"
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="flex items-center">
                  <Home size={16} className="mr-2 text-gray-500" />
                  <span>
                    <strong>{property.rooms}</strong> {property.rooms === 1 ? 'Room' : 'Rooms'}
                  </span>
                </div>
                <div className="flex items-center">
                  <Maximize size={16} className="mr-2 text-gray-500" />
                  <span>
                    <strong>{property.area_sqm}</strong> m²
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Floor:</span>
                  <span>{property.floor} of {property.total_floors}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Type:</span>
                  <span>{property.type}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <span>
                    Listed on {new Date(property.date_listed).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => alert('Contact feature would open here (demo)')}
                >
                  Contact Agent
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => alert('Schedule viewing feature would open here (demo)')}
                >
                  Schedule Viewing
                </Button>
              </div>
            </Card.Body>
          </Card>
          
          {/* District Info Card */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold">About {property.district_name}</h3>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-700 mb-4">
                {property.district_name} is one of the main districts in Chișinău, Moldova's capital city.
              </p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Average Price</span>
                  <span className="font-medium">
                    €{(property.district_id === 1 ? 950 :
                       property.district_id === 2 ? 1150 :
                       property.district_id === 3 ? 850 :
                       property.district_id === 4 ? 900 : 920)}/m²
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${
                      property.district_id === 1 ? 70 :
                      property.district_id === 2 ? 90 :
                      property.district_id === 3 ? 60 :
                      property.district_id === 4 ? 65 : 67
                    }%` }}
                  ></div>
                </div>
              </div>
              
              <Link to={`/trends?district=${property.district_id}&rooms=${property.rooms}`}>
                <Button
                  variant="outline"
                  className="w-full"
                >
                  <TrendingUp size={16} className="mr-2" />
                  View Price Trends
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Import missing component for TrendingUp icon
import { TrendingUp } from 'lucide-react';

export default PropertyDetailPage;
