import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import Card from '../components/ui/Card';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import PredictionConfidenceGauge from '../components/PredictionConfidenceGauge';
import DistrictComparisonChart from '../components/DistrictComparisonChart';
import PriceGrowthIndicator from '../components/PriceGrowthIndicator';
import { AlertTriangle, Info } from 'lucide-react';
import { getDistricts, getPriceTrends, getPricePrediction } from '../services/api';

const TrendsPredictionsPage = () => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('1'); // Default to Botanica
  const [selectedRooms, setSelectedRooms] = useState('2'); // Default to 2 rooms
  const [timeRange, setTimeRange] = useState('12'); // Default to 12 months
  const [trendData, setTrendData] = useState([]);
  const [predictionData, setPredictionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Fetch trends and predictions when selection changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch trends
        const trendsData = await getPriceTrends(
          Number(selectedDistrict), 
          Number(selectedRooms),
          Number(timeRange)
        );
        setTrendData(trendsData);
        
        // Fetch predictions
        const predictionsData = await getPricePrediction(
          Number(selectedDistrict), 
          Number(selectedRooms)
        );
        setPredictionData(predictionsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load trends and predictions');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [selectedDistrict, selectedRooms, timeRange]);

  // Format chart data
  const formatChartData = () => {
    if (!trendData || !predictionData) return [];
    
    // Make a copy of trend data
    const chartData = [...trendData];
    
    // Add prediction points if they exist
    const lastDate = new Date(chartData[chartData.length - 1].date);
    
    // Add 6-month prediction
    const sixMonthDate = new Date(lastDate);
    sixMonthDate.setMonth(lastDate.getMonth() + 6);
    const sixMonthDateStr = sixMonthDate.toISOString().slice(0, 7); // Format as YYYY-MM
    
    // Add 12-month prediction
    const twelveMonthDate = new Date(lastDate);
    twelveMonthDate.setMonth(lastDate.getMonth() + 12);
    const twelveMonthDateStr = twelveMonthDate.toISOString().slice(0, 7); // Format as YYYY-MM
    
    // Add prediction points
    chartData.push(
      { date: sixMonthDateStr, price: predictionData.prediction_6m, isPrediction: true },
      { date: twelveMonthDateStr, price: predictionData.prediction_12m, isPrediction: true }
    );
    
    return chartData;
  };

  // Calculate price change percentage
  const calculatePriceChange = () => {
    if (!trendData || trendData.length < 2) return { value: 0, isPositive: true };
    
    const oldestPrice = trendData[0].price;
    const newestPrice = trendData[trendData.length - 1].price;
    const change = ((newestPrice - oldestPrice) / oldestPrice) * 100;
    
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change >= 0
    };
  };

  // Get selected district and room names for display
  const getSelectedNames = () => {
    const districtName = districts.find(d => d.id === Number(selectedDistrict))?.name || '';
    const roomsText = selectedRooms === '1' ? '1 Room' : `${selectedRooms} Rooms`;
    
    return { districtName, roomsText };
  };

  const priceChange = calculatePriceChange();
  const { districtName, roomsText } = getSelectedNames();
  const chartData = formatChartData();

  // Options for select components
  const districtOptions = districts.map(district => ({
    value: district.id.toString(),
    label: district.name
  }));
  
  const roomOptions = [
    { value: '1', label: '1 Room' },
    { value: '2', label: '2 Rooms' },
    { value: '3', label: '3 Rooms' },
    { value: '4', label: '4+ Rooms' }
  ];
  
  const timeRangeOptions = [
    { value: '6', label: 'Last 6 Months' },
    { value: '12', label: 'Last 12 Months' },
    { value: '24', label: 'Last 24 Months' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Price Trends & Predictions</h1>
      <p className="text-gray-600 mb-6">
        Analyze historical price data and get future price predictions for different areas and property types.
      </p>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="District"
            id="district"
            options={districtOptions}
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          />
          
          <Select
            label="Number of Rooms"
            id="rooms"
            options={roomOptions}
            value={selectedRooms}
            onChange={(e) => setSelectedRooms(e.target.value)}
          />
          
          <Select
            label="Time Range"
            id="timeRange"
            options={timeRangeOptions}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trends and predictions...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Column */}
          <div className="lg:col-span-2">
            <Card>
              <Card.Header>
                <h2 className="text-xl font-semibold">
                  Price Trends: {districtName}, {roomsText}
                </h2>
              </Card.Header>
              <Card.Body>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">                    <LineChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `€${value / 1000}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [`€${value}`, 'Price']}
                        labelFormatter={(value) => `Date: ${value}`}
                      />
                      <Legend />
                      <ReferenceLine 
                        y={predictionData?.current_avg_price} 
                        stroke="#3b82f6" 
                        strokeDasharray="3 3"
                        label={{ 
                          value: 'Current Avg', 
                          position: 'insideBottomLeft',
                          fill: '#3b82f6',
                          fontSize: 12 
                        }}
                      />
                      <Line 
                        name="Historical Prices" 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        dot={{ r: 4 }}
                      />
                      <Line 
                        name="Predicted Prices" 
                        type="monotone" 
                        dataKey={(data) => data.isPrediction ? data.price : null} 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 text-sm text-gray-500">
                  <p className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    Historical prices based on actual market data
                  </p>
                  <p className="flex items-center mt-1">
                    <span className="inline-block w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                    Predicted prices based on our trend analysis algorithm
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
          
          {/* Stats Column */}
          <div>
            {/* Current Price */}
            <Card className="mb-6">
              <Card.Body>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Average Price</h3>                <div className="text-3xl font-bold text-gray-900 mb-1">
                  €{predictionData?.current_avg_price.toLocaleString()}
                </div>
                <p className="text-sm text-gray-500">
                  For {roomsText} in {districtName} district
                </p>
                
                <div className="mt-4">
                  <PriceGrowthIndicator 
                    growthRate={priceChange.isPositive ? parseFloat(priceChange.value) : -parseFloat(priceChange.value)} 
                    period={`over the past ${timeRange} months`}
                    size="md"
                  />
                </div>
              </Card.Body>
            </Card>
            
            {/* Predictions */}
            <Card className="mb-6">
              <Card.Header>
                <h3 className="text-lg font-semibold">Price Predictions</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-6">                  {/* 6-Month Prediction */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">6-Month Prediction</span>
                      <span className="font-medium">
                        €{predictionData?.prediction_6m.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: '50%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <span className="text-gray-500">Current: €{predictionData?.current_avg_price.toLocaleString()}</span>
                      <PriceGrowthIndicator 
                        growthRate={(((predictionData?.prediction_6m - predictionData?.current_avg_price) / predictionData?.current_avg_price) * 100)} 
                        size="sm"
                      />
                    </div>
                  </div>
                  
                  {/* 12-Month Prediction */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">12-Month Prediction</span>
                      <span className="font-medium">
                        €{predictionData?.prediction_12m.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-amber-500 h-2.5 rounded-full" 
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <span className="text-gray-500">Current: €{predictionData?.current_avg_price.toLocaleString()}</span>
                      <PriceGrowthIndicator 
                        growthRate={(((predictionData?.prediction_12m - predictionData?.current_avg_price) / predictionData?.current_avg_price) * 100)} 
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
                  <div className="mt-6 flex items-start bg-amber-50 border border-amber-200 rounded-md p-3">
                  <AlertTriangle size={20} className="text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Important Note</p>
                    <p>
                      These predictions are based on historical trends with a 
                      confidence level shown below. Actual market conditions may vary.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <PredictionConfidenceGauge 
                    confidence={predictionData?.confidence || 0.75} 
                    size="lg"
                  />
                </div>
              </Card.Body>
            </Card>
            
            {/* CTA */}
            <Card>
              <Card.Body className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Interested in {districtName} properties?
                </h3>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => window.location.href = `/properties?district=${selectedDistrict}&rooms=${selectedRooms}`}
                >
                  View Available Properties
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}      {/* District Comparison Section */}
      {!isLoading && !error && (
        <div className="mt-12 mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Compare Districts
          </h2>
          <DistrictComparisonChart 
            districts={districts}
            roomCount={Number(selectedRooms)}
            className="bg-white rounded-lg shadow-md"
          />
        </div>
      )}
      
      {/* Information Section */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Understanding Our Price Trends & Predictions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">How We Calculate Trends</h3>
            <p className="text-gray-600 mb-3">
              Our price trends are calculated based on historical listing and transaction data across 
              Chișinău. We aggregate and analyze this data to show you how property prices have changed 
              over time for specific districts and property types.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Data collected from multiple real estate agencies</li>
              <li>Prices normalized by square meter</li>
              <li>Outliers removed using statistical methods</li>
              <li>Monthly aggregation to smooth short-term fluctuations</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">About Our Predictions</h3>
            <p className="text-gray-600 mb-3">
              Our prediction model uses linear regression enhanced with seasonal adjustments to 
              forecast future price movements. The confidence level indicates the reliability of 
              our prediction based on data quality and market stability.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Linear regression of historical price trends</li>
              <li>Seasonal adjustments based on time of year</li>
              <li>District-specific growth pattern analysis</li>
              <li>Confidence levels based on data quality and consistency</li>
              <li>Regular model retraining with new market data</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="text-lg font-medium text-blue-700 mb-2">Key Market Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <h4 className="font-medium text-gray-800 mb-1">Botanica District</h4>
              <p className="text-sm text-gray-600">Average annual growth: 5-7%</p>
              <p className="text-sm text-gray-600">Price stability: High</p>
            </div>
            <div className="p-3 bg-white rounded shadow-sm">
              <h4 className="font-medium text-gray-800 mb-1">Centru District</h4>
              <p className="text-sm text-gray-600">Average annual growth: 7-9%</p>
              <p className="text-sm text-gray-600">Price stability: Medium</p>
            </div>
            <div className="p-3 bg-white rounded shadow-sm">
              <h4 className="font-medium text-gray-800 mb-1">Ciocana District</h4>
              <p className="text-sm text-gray-600">Average annual growth: 4-6%</p>
              <p className="text-sm text-gray-600">Price stability: High</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-8 mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How accurate are the price predictions?
            </h3>
            <p className="text-gray-600">
              Our predictions have a typical margin of error of 3-8% depending on the district and 
              property type. The confidence level shown with each prediction gives you an indication 
              of how reliable that particular forecast is based on the available data.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I use these predictions for investment decisions?
            </h3>
            <p className="text-gray-600">
              Our predictions can be a valuable tool for investment planning, but they should be used 
              as one of many factors in your decision-making process. We recommend consulting with a 
              real estate professional before making significant investment decisions.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How often are the trends and predictions updated?
            </h3>
            <p className="text-gray-600">
              We update our historical price data monthly with the latest market information. Our 
              prediction models are retrained quarterly to ensure they reflect current market conditions 
              and trends.
            </p>          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsPredictionsPage;
