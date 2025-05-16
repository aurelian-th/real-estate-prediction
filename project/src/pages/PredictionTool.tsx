import React, { useState } from 'react';
import { PredictionForm } from '../components/ui/PredictionForm';
import { PredictionResult } from '../components/ui/PredictionResult';

interface FormData {
  propertyType: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: boolean;
  yearBuilt: number;
}

export const PredictionTool: React.FC = () => {
  const [prediction, setPrediction] = useState<any | null>(null);
  
  const handleSubmit = (data: FormData) => {
    // This would normally call an API, but we'll simulate a prediction
    const mockPrediction = {
      predictedPrice: calculateMockPrice(data),
      confidenceScore: 0.87,
      priceRange: {
        low: calculateMockPrice(data) * 0.9,
        high: calculateMockPrice(data) * 1.1
      },
      marketTrend: data.location === 'central' ? 'up' : (data.location === 'ciocana' ? 'down' : 'stable') as 'up' | 'down' | 'stable',
      similarProperties: generateSimilarProperties(data)
    };
    
    setPrediction(mockPrediction);
  };
  
  // Mock price calculation based on form inputs
  const calculateMockPrice = (data: FormData) => {
    // Base price per square meter for different locations
    const basePrices: {[key: string]: number} = {
      'central': 1200,
      'botanica': 900,
      'buiucani': 1000,
      'centru': 1100,
      'ciocana': 850,
      'riscani': 950,
      'balti': 750,
      'cahul': 650,
      'orhei': 700,
      'ungheni': 600
    };
    
    // Property type multipliers
    const typeMultipliers: {[key: string]: number} = {
      'apartment': 1.0,
      'house': 1.1,
      'villa': 1.3,
      'studio': 0.9,
      'commercial': 1.2
    };
    
    // Base calculation
    let price = data.area * (basePrices[data.location] || 800);
    
    // Apply property type multiplier
    price *= typeMultipliers[data.propertyType] || 1.0;
    
    // Adjust for bedrooms, bathrooms
    price += (data.bedrooms * 5000);
    price += (data.bathrooms * 3000);
    
    // Parking bonus
    if (data.parking) {
      price += 8000;
    }
    
    // Age depreciation (newer is more valuable)
    const currentYear = new Date().getFullYear();
    const age = currentYear - data.yearBuilt;
    price *= Math.max(0.5, 1 - (age * 0.005)); // Max 50% depreciation for very old buildings
    
    // Add some randomness
    price = price * (0.98 + Math.random() * 0.04);
    
    return Math.round(price);
  };
  
  // Generate similar properties for comparison
  const generateSimilarProperties = (data: FormData) => {
    const similarProperties = [];
    
    // Similar property 1 - Same location, different size
    similarProperties.push({
      price: calculateMockPrice({
        ...data,
        area: data.area + (Math.random() > 0.5 ? 10 : -10)
      }),
      location: data.location,
      description: `${data.propertyType} with ${data.bedrooms} bedrooms, ${Math.round(data.area + (Math.random() > 0.5 ? 10 : -10))} m²`
    });
    
    // Similar property 2 - Same size, nearby location
    const nearbyLocations: {[key: string]: string} = {
      'central': 'centru',
      'botanica': 'central',
      'buiucani': 'riscani',
      'centru': 'riscani',
      'ciocana': 'botanica',
      'riscani': 'buiucani',
      'balti': 'balti',
      'cahul': 'cahul',
      'orhei': 'orhei',
      'ungheni': 'ungheni'
    };
    
    similarProperties.push({
      price: calculateMockPrice({
        ...data,
        location: nearbyLocations[data.location] || data.location
      }),
      location: nearbyLocations[data.location] || data.location,
      description: `${data.propertyType} with ${data.bedrooms} bedrooms, ${data.area} m²`
    });
    
    // Similar property 3 - Different bedrooms
    similarProperties.push({
      price: calculateMockPrice({
        ...data,
        bedrooms: data.bedrooms + (Math.random() > 0.5 ? 1 : -1)
      }),
      location: data.location,
      description: `${data.propertyType} with ${data.bedrooms + (Math.random() > 0.5 ? 1 : -1)} bedrooms, ${data.area} m²`
    });
    
    return similarProperties;
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Property Valuation Tool</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get an accurate estimate of your property's value using our AI-powered prediction model trained on Moldova's real estate market data.
          </p>
        </header>
        
        <div className="mb-12">
          <PredictionForm onSubmit={handleSubmit} />
        </div>
        
        {prediction && (
          <div className="mt-12 animate-fade-in">
            <PredictionResult {...prediction} />
          </div>
        )}
      </div>
    </div>
  );
};