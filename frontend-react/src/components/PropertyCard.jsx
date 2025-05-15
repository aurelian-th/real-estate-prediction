import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { MapPin, Home, Maximize, Euro } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition duration-300">
      <div className="relative">
        {/* Placeholder for property image */}
        <div className="bg-gray-300 h-48 flex items-center justify-center">
          <Home size={48} className="text-gray-400" />
        </div>
        
        {/* Price tag */}
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-md font-semibold flex items-center">
          <Euro size={16} className="mr-1" />
          {property.price.toLocaleString()}
        </div>
      </div>
      
      <Card.Body className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{property.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={18} className="mr-1" />
          <span>{property.address}</span>
        </div>
        
        <div className="flex justify-between text-gray-600 mb-2">
          <div className="flex items-center">
            <Home size={18} className="mr-1" />
            <span>{property.rooms} {property.rooms === 1 ? 'Room' : 'Rooms'}</span>
          </div>
          <div className="flex items-center">
            <Maximize size={18} className="mr-1" />
            <span>{property.area_sqm} m²</span>
          </div>
        </div>
        
        <p className="text-gray-600 line-clamp-3 mb-4">{property.description}</p>
        
        {property.features && property.features.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  +{property.features.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </Card.Body>
      
      <Link 
        to={`/properties/${property.id}`} 
        className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 font-medium transition"
      >
        View Details
      </Link>
    </Card>
  );
};

export default PropertyCard;
