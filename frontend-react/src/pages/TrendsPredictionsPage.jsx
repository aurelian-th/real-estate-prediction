import React, { useState, useEffect } from 'react';
   import { getDistricts, getPriceTrends, getPredictions } from '../services/api';
   import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
   import LoadingSpinner from '../components/UI/LoadingSpinner';
   import Card from '../components/UI/Card';
   import Button from '../components/UI/Button';
   import { TrendingUp, TrendingDown, HelpCircle, AlertTriangle, Info, BarChartHorizontalBig, Lightbulb } from 'lucide-react';

   const TrendsPredictionsPage = () => {
       const [districts, setDistricts] = useState([]);
       const [selectedDistrict, setSelectedDistrict] = useState('');
       const [selectedRooms, setSelectedRooms] = useState('2'); // Default to 2 rooms

       const [trendData, setTrendData] = useState(null);
       const [predictionData, setPredictionData] = useState(null);

       const [isLoadingTrends, setIsLoadingTrends] = useState(false);
       const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);
       const [error, setError] = useState(null);

       useEffect(() => {
           const fetchInitialData = async () => {
               try {
                   const districtData = await getDistricts();
                   setDistricts(districtData);
                   if (districtData.length > 0) {
                       // Pre-select Botanica (id 2) if available, for initial demo
                       const botanica = districtData.find(d => d.district_id === 2);
                       if (botanica) {
                           setSelectedDistrict(botanica.district_id.toString());
                           // Automatically fetch data for Botanica, 2 rooms on load
                           fetchTrendsAndPredictions(botanica.district_id.toString(), '2');
                       } else {
                            setSelectedDistrict(districtData[0].district_id.toString()); // Fallback to first district
                            fetchTrendsAndPredictions(districtData[0].district_id.toString(), '2');
                       }
                   }
               } catch (err) {
                   console.error("Failed to fetch districts:", err);
                   setError("Could not load district data. Please try again.");
               }
           };
           fetchInitialData();
       // eslint-disable-next-line react-hooks/exhaustive-deps
       }, []); // Empty dependency array to run once on mount


       const fetchTrendsAndPredictions = async (districtId, numRooms) => {
           if (!districtId || !numRooms) return;

           setIsLoadingTrends(true);
           setIsLoadingPredictions(true);
           setError(null);
           setTrendData(null); // Clear previous data
           setPredictionData(null); // Clear previous data

           try {
               const trends = await getPriceTrends(districtId, numRooms);
               setTrendData(trends);
           } catch (err) {
               console.error("Failed to fetch price trends:", err);
               setError(prev => prev ? prev + "\nCould not load trend data." : "Could not load trend data.");
               setTrendData({ trendData: [] }); // Set to empty to avoid breaking chart
           } finally {
               setIsLoadingTrends(false);
           }

           try {
               const predictions = await getPredictions(districtId, numRooms);
               setPredictionData(predictions);
           } catch (err) {
               console.error("Failed to fetch predictions:", err);
                setError(prev => prev ? prev + "\nCould not load prediction data." : "Could not load prediction data.");
           } finally {
               setIsLoadingPredictions(false);
           }
       };


       const handleSubmit = (e) => {
           e.preventDefault();
           if (selectedDistrict && selectedRooms) {
               fetchTrendsAndPredictions(selectedDistrict, selectedRooms);
           } else {
               setError("Please select a district and number of rooms.");
           }
       };

       const formatPrice = (tickItem) => `€${tickItem.toLocaleString('de-DE')}`;
       const formatPriceSqm = (tickItem) => `€${tickItem.toLocaleString('de-DE')}/m²`;


       return (
           <div>
               <h1 className="text-3xl font-bold text-slate-800 mb-2">Market Trends & Predictions</h1>
               <p className="text-slate-600 mb-8">Analyze historical price data and view simulated market predictions for Chișinău districts.</p>

               <Card className="mb-8 shadow-lg">
                   <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end p-4">
                       <div>
                           <label htmlFor="districtSelect" className="block text-sm font-medium text-slate-700 mb-1">Select District:</label>
                           <select
                               id="districtSelect"
                               value={selectedDistrict}
                               onChange={(e) => setSelectedDistrict(e.target.value)}
                               className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                           >
                               <option value="" disabled>-- Select District --</option>
                               {districts.map(d => (
                                   <option key={d.district_id} value={d.district_id}>{d.name}</option>
                               ))}
                           </select>
                       </div>
                       <div>
                           <label htmlFor="roomsSelect" className="block text-sm font-medium text-slate-700 mb-1">Number of Rooms:</label>
                           <select
                               id="roomsSelect"
                               value={selectedRooms}
                               onChange={(e) => setSelectedRooms(e.target.value)}
                               className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                           >
                               {[1, 2, 3, 4, 5].map(n => (
                                   <option key={n} value={n}>{n} room{n > 1 ? 's' : ''}</option>
                               ))}
                           </select>
                       </div>
                       <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={isLoadingTrends || isLoadingPredictions}>
                           <BarChartHorizontalBig size={18} className="mr-2" /> Analyze
                       </Button>
                   </form>
               </Card>

               {error && (
                   <Card className="bg-red-50 border-red-500 border-l-4 text-red-700 p-4 mb-6">
                        <div className="flex">
                           <div className="py-1"><AlertTriangle className="h-6 w-6 text-red-500 mr-3" /></div>
                           <div>
                               <p className="font-bold">Error</p>
                               <p className="text-sm whitespace-pre-line">{error}</p>
                           </div>
                       </div>
                   </Card>
               )}

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <div className="lg:col-span-2">
                       <Card className="shadow-xl h-full">
                           <h2 className="text-xl font-semibold text-slate-700 mb-1 p-4 border-b border-slate-200">
                               Price Trends: {trendData?.districtName || 'N/A'} - {trendData?.numRooms || selectedRooms} Rooms
                           </h2>
                           {isLoadingTrends && <LoadingSpinner text="Loading trends..." />}
                           {!isLoadingTrends && trendData && trendData.trendData && trendData.trendData.length > 0 && (
                               <div className="p-4 h-[400px]">
                                   <ResponsiveContainer width="100%" height="100%">
                                       <LineChart data={trendData.trendData} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                                           <CartesianGrid strokeDasharray="3 3" stroke
