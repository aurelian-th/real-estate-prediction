import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { getProperties, getDistricts } from '../services/api';

const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  
  // Filter states
  const [districtId, setDistrictId] = useState(searchParams.get('district') || '');
  const [rooms, setRooms] = useState(searchParams.get('rooms') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || '');
  
  // Fetch districts on initial load
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const data = await getDistricts();
        setDistricts(data);
      } catch (err) {
        console.error('Error fetching districts:', err);
        setError('Failed to load districts');
      }
    };
    
    fetchDistricts();
  }, []);
  
  // Fetch properties with filters
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Construct filters object from search params
        const filters = {};
        
        if (districtId) filters.district_id = Number(districtId);
        if (rooms) filters.rooms = Number(rooms);
        if (minPrice) filters.min_price = Number(minPrice);
        if (maxPrice) filters.max_price = Number(maxPrice);
        if (propertyType) filters.type = propertyType;
        
        const data = await getProperties(filters);
        setProperties(data);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProperties();
  }, [districtId, rooms, minPrice, maxPrice, propertyType]);
  
  // Handle filter form submission
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    
    // Update search params in URL
    const params = new URLSearchParams();
    if (districtId) params.set('district', districtId);
    if (rooms) params.set('rooms', rooms);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (propertyType) params.set('type', propertyType);
    
    setSearchParams(params);
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setDistrictId('');
    setRooms('');
    setMinPrice('');
    setMaxPrice('');
    setPropertyType('');
    setSearchParams({});
  };
  
  // Toggle filter visibility on mobile
  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  
  // Generate options for Select components
  const districtOptions = [
    { value: '', label: 'All Districts' },
    ...districts.map(district => ({ 
      value: district.id.toString(), 
      label: district.name 
    }))
  ];
  
  const roomOptions = [
    { value: '', label: 'Any Rooms' },
    { value: '1', label: '1 Room' },
    { value: '2', label: '2 Rooms' },
    { value: '3', label: '3 Rooms' },
    { value: '4', label: '4+ Rooms' }
  ];
  
  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Studio', label: 'Studio' },
    { value: 'House', label: 'House' },
    { value: 'Penthouse', label: 'Penthouse' }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Properties in Chișinău</h1>
      
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          onClick={toggleFilterVisibility}
          className="w-full flex items-center justify-center"
        >
          {isFilterVisible ? (
            <>
              <X size={18} className="mr-2" />
              Hide Filters
            </>
          ) : (
            <>
              <Filter size={18} className="mr-2" />
              Show Filters
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Column */}
        <div className={`md:block ${isFilterVisible ? 'block' : 'hidden'}`}>
          <Card>
            <Card.Header>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button 
                  onClick={handleResetFilters}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Reset All
                </button>
              </div>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleFilterSubmit}>
                <Select
                  label="District"
                  id="district"
                  options={districtOptions}
                  value={districtId}
                  onChange={(e) => setDistrictId(e.target.value)}
                />
                
                <Select
                  label="Rooms"
                  id="rooms"
                  options={roomOptions}
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                />
                
                <Select
                  label="Property Type"
                  id="type"
                  options={typeOptions}
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Min Price (€)"
                    id="minPrice"
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  
                  <Input
                    label="Max Price (€)"
                    id="maxPrice"
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-2"
                >
                  <Search size={18} className="mr-2" />
                  Apply Filters
                </Button>
              </form>
            </Card.Body>
          </Card>
        </div>
        
        {/* Properties Column */}
        <div className="col-span-1 md:col-span-3">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading properties...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-8">
              <div className="rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              <Button 
                variant="outline" 
                onClick={handleResetFilters}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                  Found <span className="font-semibold">{properties.length}</span> properties
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
