import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './ui/Card';
import { getPricePrediction } from '../services/api';

/**
 * A component that displays a comparison of price predictions across different districts
 * 
 * @param {Object} props Component props
 * @param {Array} props.districts Array of district objects with id and name properties
 * @param {number} props.roomCount Number of rooms to fetch predictions for
 * @param {string} props.className Additional CSS classes
 */
const DistrictComparisonChart = ({ districts, roomCount, className = '' }) => {
  const [comparisonData, setComparisonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchComparisonData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const promises = districts.map(district => 
          getPricePrediction(district.id, roomCount)
        );
        
        const results = await Promise.all(promises);
        
        // Format data for the chart
        const formattedData = [
          {
            name: 'Current',
            ...districts.reduce((acc, district, index) => {
              acc[district.name] = results[index].current_avg_price;
              return acc;
            }, {})
          },
          {
            name: '6 Month',
            ...districts.reduce((acc, district, index) => {
              acc[district.name] = results[index].prediction_6m;
              return acc;
            }, {})
          },
          {
            name: '12 Month',
            ...districts.reduce((acc, district, index) => {
              acc[district.name] = results[index].prediction_12m;
              return acc;
            }, {})
          }
        ];
        
        setComparisonData(formattedData);
      } catch (err) {
        console.error('Error fetching comparison data:', err);
        setError('Failed to load district comparison data');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (districts.length > 0) {
      fetchComparisonData();
    }
  }, [districts, roomCount]);
  
  // Generate a unique set of colors for the bars
  const getDistrictColors = () => {
    const colors = [
      '#3b82f6', // blue
      '#ef4444', // red
      '#10b981', // green
      '#f59e0b', // amber
      '#8b5cf6', // purple
      '#ec4899'  // pink
    ];
    
    return districts.reduce((acc, district, index) => {
      acc[district.name] = colors[index % colors.length];
      return acc;
    }, {});
  };
  
  const districtColors = getDistrictColors();
  
  return (
    <Card className={className}>
      <Card.Header>
        <h3 className="text-lg font-semibold">
          District Price Comparison ({roomCount} {roomCount === 1 ? 'Room' : 'Rooms'})
        </h3>
      </Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center h-64 flex items-center justify-center">
            {error}
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `€${value / 1000}k`} />
                <Tooltip 
                  formatter={(value) => [`€${value}`, '']}
                  labelFormatter={(value) => value === 'Current' ? 'Current Prices' : value === '6 Month' ? '6-Month Prediction' : '12-Month Prediction'}
                />
                <Legend />
                {districts.map(district => (
                  <Bar 
                    key={district.id}
                    dataKey={district.name} 
                    fill={districtColors[district.name]} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-4">
          This chart compares current prices and future predictions across different districts 
          for properties with {roomCount} {roomCount === 1 ? 'room' : 'rooms'}.
        </p>
      </Card.Body>
    </Card>
  );
};

DistrictComparisonChart.propTypes = {
  districts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  roomCount: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default DistrictComparisonChart;
