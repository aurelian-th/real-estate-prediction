import React, { useState, useEffect, useCallback } from 'react';
    import { getProperties } from '../services/api';
    import PropertyCard from '../components/Properties/PropertyCard';
    import PropertyFilter from '../components/Properties/PropertyFilter';
    import LoadingSpinner from '../components/UI/LoadingSpinner';
    import { AlertTriangle, Info } from 'lucide-react';

    const PropertiesPage = () => {
        const [properties, setProperties] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const [filters, setFilters] = useState({});
        const [currentPage, setCurrentPage] = useState(1);
        const propertiesPerPage = 6; // Adjust as needed

        const fetchPropertiesData = useCallback(async (currentFilters) => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getProperties(currentFilters);
                setProperties(data);
            } catch (err) {
                console.error("Failed to fetch properties:", err);
                setError(err.message || 'Could not load properties. Please try again later.');
                setProperties([]); // Clear properties on error
            } finally {
                setIsLoading(false);
            }
        }, []);

        useEffect(() => {
            fetchPropertiesData(filters);
        }, [filters, fetchPropertiesData]);

        const handleFilterChange = (newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1); // Reset to first page on new filter
        };

        // Pagination logic
        const indexOfLastProperty = currentPage * propertiesPerPage;
        const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
        const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
        const totalPages = Math.ceil(properties.length / propertiesPerPage);

        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        return (
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Property Listings</h1>
                <p className="text-slate-600 mb-8">Explore available properties. Use the filters to narrow down your search.</p>

                <PropertyFilter onFilterChange={handleFilterChange} initialFilters={filters} />

                {isLoading && <LoadingSpinner text="Fetching properties..." />}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md mb-6" role="alert">
                        <div className="flex">
                            <div className="py-1"><AlertTriangle className="h-6 w-6 text-red-500 mr-3" /></div>
                            <div>
                                <p className="font-bold">Error</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                {!isLoading && !error && properties.length === 0 && (
                     <div className="bg-sky-50 border-l-4 border-sky-500 text-sky-700 p-4 rounded-md shadow-md" role="alert">
                        <div className="flex">
                            <div className="py-1"><Info className="h-6 w-6 text-sky-500 mr-3" /></div>
                            <div>
                                <p className="font-bold">No Properties Found</p>
                                <p className="text-sm">No properties match your current filter criteria. Try adjusting your search.</p>
                            </div>
                        </div>
                    </div>
                )}

                {!isLoading && !error && properties.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentProperties.map(property => (
                                <PropertyCard key={property.property_id} property={property} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <nav className="mt-12 flex justify-center">
                                <ul className="inline-flex items-center -space-x-px">
                                    <li>
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-2 ml-0 leading-tight text-slate-500 bg-white border border-slate-300 rounded-l-lg hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <li key={i}>
                                            <button
                                                onClick={() => paginate(i + 1)}
                                                className={`px-3 py-2 leading-tight border border-slate-300 ${currentPage === i + 1 ? 'text-sky-600 bg-sky-50 hover:bg-sky-100 hover:text-sky-700' : 'text-slate-500 bg-white hover:bg-slate-100 hover:text-slate-700'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-2 leading-tight text-slate-500 bg-white border border-slate-300 rounded-r-lg hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </>
                )}
            </div>
        );
    };

    export default PropertiesPage;
