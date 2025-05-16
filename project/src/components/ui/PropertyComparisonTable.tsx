import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

interface Property {
  id: number;
  name: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt: number;
  amenities: string[];
  pricePerSqm: number;
  predictedValue: number;
  valueRatio: number;
}

interface PropertyComparisonTableProps {
  properties: Property[];
}

export const PropertyComparisonTable: React.FC<PropertyComparisonTableProps> = ({ properties }) => {
  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">No Properties Selected</h3>
        <p className="text-gray-600">Add properties to compare them side by side.</p>
      </div>
    );
  }

  // Function to format price
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Function to determine value rating
  const getValueRating = (ratio: number) => {
    if (ratio >= 1.1) return { label: 'Excellent Value', color: 'text-green-600' };
    if (ratio >= 0.95) return { label: 'Good Value', color: 'text-blue-600' };
    if (ratio >= 0.9) return { label: 'Fair Value', color: 'text-yellow-600' };
    return { label: 'Poor Value', color: 'text-red-600' };
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Property Details
              </th>
              {properties.map(property => (
                <th 
                  key={property.id} 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {property.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Price */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Price
              </td>
              {properties.map(property => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  €{formatPrice(property.price)}
                </td>
              ))}
            </tr>
            
            {/* Location */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Location
              </td>
              {properties.map(property => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.location}
                </td>
              ))}
            </tr>
            
            {/* Type */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Property Type
              </td>
              {properties.map(property => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {property.type}
                </td>
              ))}
            </tr>
            
            {/* Bedrooms */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Bedrooms
              </td>
              {properties.map(property => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.bedrooms}
                </td>
              ))}
            </tr>
            
            {/* Bathrooms */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Bathrooms
              </td>
              {properties.map(property => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.bathrooms}
                </td>
              ))}
            </tr>
            
            {/* Area */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Area
              </td>
              {properties.map(property => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.area} m²
                </td>
              ))}
            </tr>
            
            {/* Year Built */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Year Built
              </td>
              {properties.map(property => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.yearBuilt}
                </td>
              ))}
            </tr>
            
            {/* Amenities */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Amenities
              </td>
              {properties.map(property => (
                <td key={property.id} className="px-6 py-4 text-sm text-gray-500">
                  <ul className="list-disc pl-5 space-y-1">
                    {property.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            
            {/* Price per sqm */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Price per m²
              </td>
              {properties.map(property => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  €{formatPrice(property.pricePerSqm)}/m²
                </td>
              ))}
            </tr>
            
            {/* AI Predicted Value */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                AI Predicted Value
              </td>
              {properties.map(property => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  €{formatPrice(property.predictedValue)}
                </td>
              ))}
            </tr>
            
            {/* Value Rating */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Value Rating
              </td>
              {properties.map(property => {
                const rating = getValueRating(property.valueRatio);
                return (
                  <td key={property.id} className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${rating.color}`}>
                    {rating.label}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};