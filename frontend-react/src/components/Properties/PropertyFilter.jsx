import React, { useState, useEffect } from 'react';
   import { getDistricts } from '../../services/api';
   import Button from '../UI/Button';
   import { Search, RotateCcw } from 'lucide-react';

   const PropertyFilter = ({ onFilterChange, initialFilters }) => {
       const [districts, setDistricts] = useState([]);
       const [selectedDistrict, setSelectedDistrict] = useState(initialFilters?.district_id || '');
       const [numRooms, setNumRooms] = useState(initialFilters?.num_rooms || '');
       const [minPrice, setMinPrice] = useState(initialFilters?.min_price || '');
       const [maxPrice, setMaxPrice] = useState(initialFilters?.max_price || '');

       useEffect(() => {
           const fetchDistricts = async () => {
               try {
                   const data = await getDistricts();
                   setDistricts(data);
               } catch (error) {
                   console.error("Failed to fetch districts:", error);
               }
           };
           fetchDistricts();
       }, []);

       const handleFilterSubmit = (e) => {
           e.preventDefault();
           onFilterChange({
               district_id: selectedDistrict,
               num_rooms: numRooms,
               min_price: minPrice,
               max_price: maxPrice,
           });
       };

       const handleResetFilters = () => {
           setSelectedDistrict('');
           setNumRooms('');
           setMinPrice('');
           setMaxPrice('');
           onFilterChange({}); // Apply empty filters to reset
       };


       return (
           <form onSubmit={handleFilterSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-8">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                   <div>
                       <label htmlFor="district" className="block text-sm font-medium text-slate-700 mb-1">District</label>
                       <select
                           id="district"
                           value={selectedDistrict}
                           onChange={(e) => setSelectedDistrict(e.target.value)}
                           className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                       >
                           <option value="">All Districts</option>
                           {districts.map(d => (
                               <option key={d.district_id} value={d.district_id}>{d.name}</option>
                           ))}
                       </select>
                   </div>
                   <div>
                       <label htmlFor="numRooms" className="block text-sm font-medium text-slate-700 mb-1">Rooms</label>
                       <select
                           id="numRooms"
                           value={numRooms}
                           onChange={(e) => setNumRooms(e.target.value)}
                           className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                       >
                           <option value="">Any</option>
                           {[1, 2, 3, 4, 5].map(n => (
                               <option key={n} value={n}>{n} room{n > 1 ? 's' : ''}</option>
                           ))}
                       </select>
                   </div>
                   <div>
                       <label htmlFor="minPrice" className="block text-sm font-medium text-slate-700 mb-1">Min Price (€)</label>
                       <input
                           type="number"
                           id="minPrice"
                           placeholder="e.g., 30000"
                           value={minPrice}
                           onChange={(e) => setMinPrice(e.target.value)}
                           className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                       />
                   </div>
                   <div>
                       <label htmlFor="maxPrice" className="block text-sm font-medium text-slate-700 mb-1">Max Price (€)</label>
                       <input
                           type="number"
                           id="maxPrice"
                           placeholder="e.g., 100000"
                           value={maxPrice}
                           onChange={(e) => setMaxPrice(e.target.value)}
                           className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                       />
                   </div>
               </div>
               <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                   <Button type="button" variant="secondary" onClick={handleResetFilters} className="w-full sm:w-auto">
                       <RotateCcw size={16} className="mr-2" /> Reset
                   </Button>
                   <Button type="submit" variant="primary" className="w-full sm:w-auto">
                       <Search size={16} className="mr-2" /> Apply Filters
                   </Button>
               </div>
           </form>
       );
   };

   export default PropertyFilter;
