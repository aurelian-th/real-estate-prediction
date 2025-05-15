import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Search, Trash2, RefreshCw, BookmarkPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PropertyCard from '../components/PropertyCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import { 
  getUserSavedSearches, 
  getSavedProperties,
  saveSearch,
  deleteSavedSearch,
  getProperties
} from '../services/api';

const DashboardPage = () => {
  const { isAuthenticated, user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('saved-properties');
  const [savedProperties, setSavedProperties] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // New search form state
  const [isAddingSearch, setIsAddingSearch] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    district_id: '',
    rooms: '',
    min_price: '',
    max_price: '',
    type: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Load saved properties and searches on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        // Fetch saved properties
        const propertiesData = await getSavedProperties();
        setSavedProperties(propertiesData);
        
        // Fetch saved searches
        const searchesData = await getUserSavedSearches();
        setSavedSearches(searchesData);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load your saved data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  // Handle search form input changes
  const handleSearchFilterChange = (e) => {
    const { id, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  // Execute property search with current filters
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    try {
      const filters = {};
      
      // Only add filters with values
      if (searchFilters.district_id) filters.district_id = Number(searchFilters.district_id);
      if (searchFilters.rooms) filters.rooms = Number(searchFilters.rooms);
      if (searchFilters.min_price) filters.min_price = Number(searchFilters.min_price);
      if (searchFilters.max_price) filters.max_price = Number(searchFilters.max_price);
      if (searchFilters.type) filters.type = searchFilters.type;
      
      const results = await getProperties(filters);
      setSearchResults(results);
    } catch (err) {
      console.error('Error searching properties:', err);
    } finally {
      setIsSearching(false);
    }
  };
  
  // Save the current search
  const handleSaveSearch = async () => {
    if (!newSearchName.trim()) {
      alert('Please enter a name for your search');
      return;
    }
    
    try {
      // Create search data to save
      const searchData = {
        name: newSearchName,
        filters: searchFilters
      };
      
      const response = await saveSearch(searchData);
      
      // Add the new search to the saved searches list
      setSavedSearches(prev => [...prev, response.search]);
      
      // Reset form
      setNewSearchName('');
      setIsAddingSearch(false);
      
      alert('Search saved successfully!');
    } catch (err) {
      console.error('Error saving search:', err);
      alert('Failed to save search');
    }
  };
  
  // Delete a saved search
  const handleDeleteSearch = async (searchId) => {
    if (!confirm('Are you sure you want to delete this saved search?')) {
      return;
    }
    
    try {
      await deleteSavedSearch(searchId);
      
      // Remove the deleted search from the list
      setSavedSearches(prev => prev.filter(search => search.id !== searchId));
    } catch (err) {
      console.error('Error deleting search:', err);
      alert('Failed to delete search');
    }
  };
  
  // Apply a saved search
  const handleApplySavedSearch = async (search) => {
    setSearchFilters(search.filters);
    setActiveTab('new-search');
    
    // Execute the search
    try {
      setIsSearching(true);
      const results = await getProperties(search.filters);
      setSearchResults(results);
    } catch (err) {
      console.error('Error applying saved search:', err);
    } finally {
      setIsSearching(false);
    }
  };
  
  // District options for selects
  const districtOptions = [
    { value: '', label: 'All Districts' },
    { value: '1', label: 'Botanica' },
    { value: '2', label: 'Centru' },
    { value: '3', label: 'Ciocana' },
    { value: '4', label: 'Rîșcani' },
    { value: '5', label: 'Buiucani' }
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
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage your saved properties and custom searches in one place
      </p>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'saved-properties'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('saved-properties')}
          >
            Saved Properties
          </button>
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'saved-searches'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('saved-searches')}
          >
            Saved Searches
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'new-search'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('new-search')}
          >
            New Search
          </button>
        </nav>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : (
        <div>
          {/* Saved Properties Tab */}
          {activeTab === 'saved-properties' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Saved Properties
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const fetchSavedProperties = async () => {
                      try {
                        setIsLoading(true);
                        const data = await getSavedProperties();
                        setSavedProperties(data);
                      } catch (err) {
                        console.error('Error refreshing properties:', err);
                      } finally {
                        setIsLoading(false);
                      }
                    };
                    fetchSavedProperties();
                  }}
                >
                  <RefreshCw size={16} className="mr-2" />
                  Refresh
                </Button>
              </div>
              
              {savedProperties.length === 0 ? (
                <Card>
                  <Card.Body className="text-center py-12">
                    <div className="rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <BookmarkPlus size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No saved properties yet</h3>
                    <p className="text-gray-600 mb-4">
                      Browse properties and save your favorites to view them here
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => window.location.href = '/properties'}
                    >
                      Browse Properties
                    </Button>
                  </Card.Body>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Saved Searches Tab */}
          {activeTab === 'saved-searches' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Saved Searches
                </h2>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const fetchSavedSearches = async () => {
                        try {
                          setIsLoading(true);
                          const data = await getUserSavedSearches();
                          setSavedSearches(data);
                        } catch (err) {
                          console.error('Error refreshing searches:', err);
                        } finally {
                          setIsLoading(false);
                        }
                      };
                      fetchSavedSearches();
                    }}
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Refresh
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => setActiveTab('new-search')}
                  >
                    <Search size={16} className="mr-2" />
                    New Search
                  </Button>
                </div>
              </div>
              
              {savedSearches.length === 0 ? (
                <Card>
                  <Card.Body className="text-center py-12">
                    <div className="rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No saved searches yet</h3>
                    <p className="text-gray-600 mb-4">
                      Create and save your custom property searches to quickly access them later
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setActiveTab('new-search')}
                    >
                      Create a Search
                    </Button>
                  </Card.Body>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedSearches.map((search) => (
                    <Card key={search.id} className="h-full">
                      <Card.Body>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-gray-800">{search.name}</h3>
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteSearch(search.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm text-gray-600 mb-1">Search criteria:</div>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {search.filters.district_id && (
                              <li>
                                District: {districtOptions.find(d => d.value === search.filters.district_id.toString())?.label}
                              </li>
                            )}
                            {search.filters.rooms && (
                              <li>
                                Rooms: {search.filters.rooms}
                              </li>
                            )}
                            {search.filters.min_price && (
                              <li>
                                Min Price: €{search.filters.min_price}
                              </li>
                            )}
                            {search.filters.max_price && (
                              <li>
                                Max Price: €{search.filters.max_price}
                              </li>
                            )}
                            {search.filters.type && (
                              <li>
                                Property Type: {search.filters.type}
                              </li>
                            )}
                          </ul>
                        </div>
                        
                        <div className="text-xs text-gray-500 mb-4">
                          Created: {new Date(search.created_at).toLocaleDateString()}
                        </div>
                        
                        <Button
                          variant="primary"
                          className="w-full"
                          onClick={() => handleApplySavedSearch(search)}
                        >
                          <Search size={16} className="mr-2" />
                          Run Search
                        </Button>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* New Search Tab */}
          {activeTab === 'new-search' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Property Search
                </h2>
                
                <Card>
                  <Card.Body>
                    <form onSubmit={handleSearch}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <Select
                          label="District"
                          id="district_id"
                          options={districtOptions}
                          value={searchFilters.district_id}
                          onChange={handleSearchFilterChange}
                        />
                        
                        <Select
                          label="Rooms"
                          id="rooms"
                          options={roomOptions}
                          value={searchFilters.rooms}
                          onChange={handleSearchFilterChange}
                        />
                        
                        <Select
                          label="Property Type"
                          id="type"
                          options={typeOptions}
                          value={searchFilters.type}
                          onChange={handleSearchFilterChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input
                          label="Min Price (€)"
                          id="min_price"
                          type="number"
                          placeholder="Min"
                          value={searchFilters.min_price}
                          onChange={handleSearchFilterChange}
                        />
                        
                        <Input
                          label="Max Price (€)"
                          id="max_price"
                          type="number"
                          placeholder="Max"
                          value={searchFilters.max_price}
                          onChange={handleSearchFilterChange}
                        />
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={isSearching}
                        >
                          {isSearching ? (
                            <span className="flex items-center">
                              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                              Searching...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Search size={18} className="mr-2" />
                              Search Properties
                            </span>
                          )}
                        </Button>
                        
                        {!isAddingSearch ? (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsAddingSearch(true)}
                          >
                            <BookmarkPlus size={18} className="mr-2" />
                            Save This Search
                          </Button>
                        ) : (
                          <div className="flex flex-1 space-x-2">
                            <Input
                              placeholder="Enter a name for this search"
                              value={newSearchName}
                              onChange={(e) => setNewSearchName(e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              variant="success"
                              onClick={handleSaveSearch}
                            >
                              Save
                            </Button>
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={() => {
                                setIsAddingSearch(false);
                                setNewSearchName('');
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </form>
                  </Card.Body>
                </Card>
              </div>
              
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Search Results ({searchResults.length})
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                </div>
              )}
              
              {searchResults.length === 0 && !isSearching && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md flex items-center mt-6">
                  <AlertCircle size={20} className="mr-2" />
                  <span>Use the search form above to find properties.</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
