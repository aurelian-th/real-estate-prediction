import React from 'react';
   import { Link } from 'react-router-dom';
   import { MapPin, BedDouble, Bath,maximize, Euro, CalendarDays } from 'lucide-react';
   import Card from '../UI/Card';

   const PropertyCard = ({ property }) => {
       if (!property) return null;

       const placeholderImage = `https://placehold.co/600x400/e2e8f0/94a3b8?text=${property.district_name}`;

       return (
           <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
               <Link to={`/properties/${property.property_id}`} className="block">
                   <img
                       src={placeholderImage}
                       alt={`Property in ${property.address}`}
                       className="w-full h-48 object-cover"
                       onError={(e) => e.target.src = 'https://placehold.co/600x400/e0e0e0/a0a0a0?text=Image+Error'}
                   />
               </Link>
               <div className="p-4 flex-grow flex flex-col">
                   <Link to={`/properties/${property.property_id}`} className="block">
                       <h3 className="text-lg font-semibold text-sky-700 hover:text-sky-800 mb-1 truncate" title={property.address}>
                           {property.address}
                       </h3>
                   </Link>
                   <div className="flex items-center text-sm text-slate-600 mb-2">
                       <MapPin size={14} className="mr-1 text-rose-500" />
                       <span>{property.district_name}</span>
                   </div>
                   <p className="text-xs text-slate-500 mb-3 flex-grow min-h-[40px]">
                       {property.description?.substring(0, 70)}{property.description?.length > 70 ? '...' : ''}
                   </p>

                   <div className="grid grid-cols-2 gap-2 text-sm text-slate-700 mb-3">
                       <div className="flex items-center">
                           <BedDouble size={16} className="mr-2 text-sky-600" />
                           <span>{property.num_rooms} rooms</span>
                       </div>
                       <div className="flex items-center">
                           <maximize size={16} className="mr-2 text-sky-600" /> {/* Using maximize as a generic area icon */}
                           <span>{property.area_sqm} m²</span>
                       </div>
                       {property.year_built && (
                            <div className="flex items-center">
                               <CalendarDays size={16} className="mr-2 text-sky-600" />
                               <span>Built: {property.year_built}</span>
                           </div>
                       )}
                        {property.floor && property.total_floors && (
                            <div className="flex items-center">
                               <Building2 size={16} className="mr-2 text-sky-600" />
                               <span>{property.floor}/{property.total_floors} floor</span>
                           </div>
                       )}
                   </div>

                   <div className="mt-auto">
                       <div className="text-xl font-bold text-sky-800 mb-3">
                           <Euro size={20} className="inline mr-1" />
                           {property.price?.toLocaleString('de-DE')}
                       </div>
                       <Link
                           to={`/properties/${property.property_id}`}
                           className="w-full text-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors text-sm font-medium"
                       >
                           View Details
                       </Link>
                   </div>
               </div>
           </Card>
       );
   };

   export default PropertyCard;
