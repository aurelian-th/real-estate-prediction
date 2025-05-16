import React, { useState } from 'react';
import { Building, Home, Map, BedDouble, Bath, Square, Car } from 'lucide-react';

interface PredictionFormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  propertyType: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: boolean;
  yearBuilt: number;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    propertyType: 'apartment',
    location: 'central',
    bedrooms: 2,
    bathrooms: 1,
    area: 60,
    parking: false,
    yearBuilt: 2010
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked
      });
    } else if (type === 'number') {
      setFormData({
        ...formData,
        [name]: Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setLoading(false);
    }, 1500);
  };

  const moldovaRegions = [
    { value: 'central', label: 'Chișinău (Central)' },
    { value: 'botanica', label: 'Botanica' },
    { value: 'buiucani', label: 'Buiucani' },
    { value: 'centru', label: 'Centru' },
    { value: 'ciocana', label: 'Ciocana' },
    { value: 'riscani', label: 'Râșcani' },
    { value: 'balti', label: 'Bălți' },
    { value: 'cahul', label: 'Cahul' },
    { value: 'orhei', label: 'Orhei' },
    { value: 'ungheni', label: 'Ungheni' }
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Property Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-gray-400" />
            </div>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Map className="h-5 w-5 text-gray-400" />
            </div>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {moldovaRegions.map(region => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BedDouble className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="bedrooms"
              min="0"
              max="10"
              value={formData.bedrooms}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Bath className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="bathrooms"
              min="0"
              max="10"
              step="0.5"
              value={formData.bathrooms}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Area (m²)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Square className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="area"
              min="10"
              max="1000"
              value={formData.area}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year Built
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Home className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="yearBuilt"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.yearBuilt}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center h-5">
            <input
              id="parking"
              name="parking"
              type="checkbox"
              checked={formData.parking}
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="parking" className="font-medium text-gray-700">Parking Available</label>
            <p className="text-gray-500">Property includes dedicated parking space</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculating Prediction...
            </>
          ) : 'Get Price Prediction'}
        </button>
      </div>
    </form>
  );
};