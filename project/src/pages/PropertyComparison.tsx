import React, { useState } from 'react';
import { Search, PlusCircle, Building, Home } from 'lucide-react';
import { PropertyComparisonTable } from '../components/ui/PropertyComparisonTable';

// Sample property data
const sampleProperties = [
  {
    id: 1,
    name: "Luxury Apartment in Centru",
    price: 129000,
    location: "Centru, Chișinău",
    type: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 85,
    yearBuilt: 2019,
    amenities: ["Elevator", "Underground Parking", "Security", "Balcony", "Central Heating"],
    pricePerSqm: 1518,
    predictedValue: 135000,
    valueRatio: 1.05
  },
  {
    id: 2,
    name: "Modern Studio in Botanica",
    price: 42000,
    location: "Botanica, Chișinău",
    type: "studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 40,
    yearBuilt: 2015,
    amenities: ["Balcony", "Central Heating", "Security Door"],
    pricePerSqm: 1050,
    predictedValue: 44500,
    valueRatio: 1.06
  },
  {
    id: 3,
    name: "Family House in Buiucani",
    price: 189000,
    location: "Buiucani, Chișinău",
    type: "house",
    bedrooms: 4,
    bathrooms: 3,
    area: 175,
    yearBuilt: 2010,
    amenities: ["Garden", "Garage", "Terrace", "Fireplace", "Storage Room"],
    pricePerSqm: 1080,
    predictedValue: 185000,
    valueRatio: 0.98
  },
  {
    id: 4,
    name: "Renovated Apartment in Riscani",
    price: 75000,
    location: "Riscani, Chișinău",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    yearBuilt: 1985,
    amenities: ["Renovated", "Balcony", "Storage Room", "New Windows"],
    pricePerSqm: 1154,
    predictedValue: 72000,
    valueRatio: 0.96
  },
  {
    id: 5,
    name: "Commercial Space in Ciocana",
    price: 95000,
    location: "Ciocana, Chișinău",
    type: "commercial",
    bedrooms: 0,
    bathrooms: 1,
    area: 90,
    yearBuilt: 2005,
    amenities: ["Street Access", "High Ceilings", "Storage Room", "Alarm System"],
    pricePerSqm: 1056,
    predictedValue: 92000,
    valueRatio: 0.97
  },
  {
    id: 6,
    name: "Villa in Codru",
    price: 245000,
    location: "Codru, Chișinău",
    type: "villa",
    bedrooms: 5,
    bathrooms: 3,
    area: 210,
    yearBuilt: 2012,
    amenities: ["Swimming Pool", "Garage", "Garden", "Terrace", "Sauna", "Security System"],
    pricePerSqm: 1167,
    predictedValue: 258000,
    valueRatio: 1.05
  }
];

export const PropertyComparison: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperties, setSelectedProperties] = useState<typeof sampleProperties>([]);
  const [availableProperties, setAvailableProperties] = useState<typeof sampleProperties>(sampleProperties);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredProperties = availableProperties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddProperty = (property: any) => {
    if (selectedProperties.length < 3) {
      setSelectedProperties([...selectedProperties, property]);
      setAvailableProperties(availableProperties.filter(p => p.id !== property.id));
    }
  };
  
  const handleRemoveProperty = (property: any) => {
    setSelectedProperties(selectedProperties.filter(p => p.id !== property.id));
    setAvailableProperties([...availableProperties, property].sort((a, b) => a.id - b.id));
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Property Comparison Tool</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Compare different properties side by side to make better investment decisions. Add up to 3 properties to see detailed comparisons.
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Properties</h2>
            
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={handleSearch}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {filteredProperties.length > 0 ? (
                filteredProperties.map(property => (
                  <div key={property.id} className="bg-gray-50 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{property.name}</h3>
                        <p className="text-sm text-gray-600">{property.location}</p>
                        <div className="flex items-center mt-1">
                          {property.type === 'apartment' || property.type === 'studio' ? (
                            <Building className="h-4 w-4 text-gray-500 mr-1" />
                          ) : (
                            <Home className="h-4 w-4 text-gray-500 mr-1" />
                          )}
                          <span className="text-xs text-gray-500 capitalize">{property.type}</span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-xs text-gray-500">{property.area} m²</span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-xs text-gray-500">{property.bedrooms} bd</span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-xs text-gray-500">{property.bathrooms} ba</span>
                        </div>
                        <p className="text-sm font-medium text-blue-600 mt-2">€{property.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => handleAddProperty(property)}
                        disabled={selectedProperties.length >= 3}
                        className={`p-1 rounded-full ${
                          selectedProperties.length >= 3
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-600 hover:bg-blue-50'
                        }`}
                        title={selectedProperties.length >= 3 ? "Maximum 3 properties" : "Add property"}
                      >
                        <PlusCircle className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No properties found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Comparison Table {selectedProperties.length > 0 && `(${selectedProperties.length} selected)`}
            </h2>
            
            {selectedProperties.length > 0 ? (
              <div>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedProperties.map(property => (
                      <div key={property.id} className="inline-flex items-center bg-blue-50 rounded-full pl-3 pr-2 py-1">
                        <span className="text-sm text-blue-700 mr-1">{property.name}</span>
                        <button
                          onClick={() => handleRemoveProperty(property)}
                          className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <PropertyComparisonTable properties={selectedProperties} />
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Properties Selected</h3>
                <p className="text-gray-600 max-w-sm mx-auto">
                  Add properties from the list on the left to compare them side by side.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};