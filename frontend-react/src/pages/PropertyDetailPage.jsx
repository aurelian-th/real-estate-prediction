import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPropertyById } from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Card from '../components/UI/Card';
import { MapPin, BedDouble, Bath,maximize, Euro, CalendarDays, Building2, Tag, Info, AlertTriangle, ArrowLeft } from 'lucide-react';

const PropertyDetailPage = () => {
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getPropertyById(propertyId);
                setProperty(data);
            } catch (err) {
                console.error(`Failed to fetch property ${propertyId}:`, err);
                setError(err.message || 'Could not load property details.');
            } finally {
                setIsLoading(false);
            }
        };
        if (propertyId) {
            fetchProperty();
        }
    }, [propertyId]);

    if (isLoading) return <LoadingSpinner text="Loading property details..." />;
    if (error) {
        return (
            <Card className="text-center">
                <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
                <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Property</h2>
                <p className="text-slate-600 mb-6">{error}</p>
                <Link to="/properties">
                    <Button variant="outline">
                        <ArrowLeft size={18} className="mr-2" /> Back to Listings
                    </Button>
                </Link>
            </Card>
        );
    }
    if (!property) {
         return (
            <Card className="text-center">
                <Info size={48} className="mx-auto text-sky-500 mb-4" />
                <h2 className="text-xl font-semibold text-sky-700 mb-2">Property Not Found</h2>
                <p className="text-slate-600 mb-6">The property you are looking for does not exist or may have been removed.</p>
                <Link to="/properties">
                    <Button variant="outline">
                        <ArrowLeft size={18} className="mr-2" /> Back to Listings
                    </Button>
                </Link>
            </Card>
        );
    }

    const placeholderImage = `https://placehold.co/800x500/e2e8f0/94a3b8?text=${property.district_name}`;

    return (
        <div className="max-w-4xl mx-auto">
            <Link to="/properties" className="inline-flex items-center text-sky-600 hover:text-sky-800 mb-6 group">
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Listings
            </Link>

            <Card shadow="xl">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img
                            src={placeholderImage}
                            alt={`Property at ${property.address}`}
                            className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                            onError={(e) => e.target.src = 'https://placehold.co/800x500/e0e0e0/a0a0a0?text=Image+Error'}
                        />
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">{property.address}</h1>
                        <div className="flex items-center text-slate-600 mb-4">
                            <MapPin size={18} className="mr-2 text-rose-500" />
                            <span className="text-lg">{property.district_name}</span>
                        </div>

                        <div className="text-3xl font-bold text-sky-700 mb-6">
                            <Euro size={28} className="inline mr-1" />
                            {property.price?.toLocaleString('de-DE')}
                        </div>

                        <p className="text-slate-700 mb-6">{property.description}</p>

                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-slate-700 mb-6">
                            <DetailItem icon={<BedDouble size={18} className="text-sky-600" />} label="Rooms" value={property.num_rooms} />
                            <DetailItem icon={<maximize size={18} className="text-sky-600" />} label="Area" value={`${property.area_sqm} m²`} />
                            {property.year_built && <DetailItem icon={<CalendarDays size={18} className="text-sky-600" />} label="Built" value={property.year_built} />}
                            {property.floor && property.total_floors && <DetailItem icon={<Building2 size={18} className="text-sky-600" />} label="Floor" value={`${property.floor} of ${property.total_floors}`} />}
                            <DetailItem icon={<Tag size={18} className="text-sky-600" />} label="Type" value={property.property_type} />
                            {property.date_listed && <DetailItem icon={<CalendarDays size={18} className="text-sky-600" />} label="Listed" value={new Date(property.date_listed).toLocaleDateString()} />}
                        </div>

                        {property.amenities && property.amenities.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-md font-semibold text-slate-700 mb-2">Amenities:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {property.amenities.map(amenity => (
                                        <span key={amenity} className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs capitalize">
                                            {amenity.replace(/_/g, ' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                         <Button className="w-full mt-4" size="lg">
                            Contact Agent (Simulated)
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

// eslint-disable-next-line react/prop-types
const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center">
        {icon}
        <span className="ml-2 text-sm"><span className="font-medium">{label}:</span> {value}</span>
    </div>
);

export default PropertyDetailPage;
