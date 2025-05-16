import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface PredictionResultProps {
  predictedPrice: number;
  confidenceScore: number;
  priceRange: {
    low: number;
    high: number;
  };
  marketTrend: 'up' | 'down' | 'stable';
  similarProperties: {
    price: number;
    location: string;
    description: string;
  }[];
}

export const PredictionResult: React.FC<PredictionResultProps> = ({
  predictedPrice,
  confidenceScore,
  priceRange,
  marketTrend,
  similarProperties
}) => {
  const [animatedPrice, setAnimatedPrice] = useState(0);
  
  useEffect(() => {
    // Animate the price counting up
    const duration = 1500; // 1.5 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    const step = predictedPrice / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= predictedPrice) {
        current = predictedPrice;
        clearInterval(timer);
      }
      setAnimatedPrice(Math.floor(current));
    }, interval);
    
    return () => clearInterval(timer);
  }, [predictedPrice]);
  
  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Prediction Results</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm text-gray-500 mb-1">Estimated Property Value</p>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-blue-600">€{formatPrice(animatedPrice)}</span>
            <span className="ml-2 text-sm text-gray-500">EUR</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <div 
            className="radial-progress mr-3" 
            style={{ 
              "--value": confidenceScore * 100, 
              "--size": "4rem",
              "--thickness": "0.5rem",
              background: `conic-gradient(#3b82f6 ${confidenceScore * 100}%, #e5e7eb 0)`,
              borderRadius: "100%"
            } as React.CSSProperties}
          >
            <span className="text-sm font-medium">{Math.round(confidenceScore * 100)}%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Confidence Score</p>
            <p className="text-xs text-gray-500">Based on market data</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">€{formatPrice(priceRange.low)}</span>
            <span className="text-gray-500">€{formatPrice(priceRange.high)}</span>
          </div>
          <div className="mt-2 relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-blue-500"
              style={{ 
                width: `${((predictedPrice - priceRange.low) / (priceRange.high - priceRange.low)) * 100}%`,
                transition: "width 1s ease-out"
              }}
            ></div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Market Trend</h4>
          <div className="flex items-center">
            {marketTrend === 'up' ? (
              <>
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-600 font-medium">Rising Market</span>
              </>
            ) : marketTrend === 'down' ? (
              <>
                <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-600 font-medium">Falling Market</span>
              </>
            ) : (
              <>
                <span className="h-5 w-5 flex justify-center items-center text-yellow-500 mr-2">→</span>
                <span className="text-yellow-600 font-medium">Stable Market</span>
              </>
            )}
            <span className="ml-2 text-xs text-gray-500">(Next 6 months)</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {marketTrend === 'up' 
              ? 'Property values in this area are expected to increase.' 
              : marketTrend === 'down'
                ? 'Property values in this area are expected to decrease.'
                : 'Property values in this area are expected to remain stable.'
            }
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Similar Properties</h4>
        <div className="space-y-3">
          {similarProperties.map((property, index) => (
            <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm font-medium text-gray-800">{property.description}</p>
                <p className="text-xs text-gray-500">{property.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">€{formatPrice(property.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg flex items-start">
        <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-700">
          This prediction is based on historical data and current market trends. Actual property values may vary based on specific property conditions, market fluctuations, and other factors not considered in this model.
        </p>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};