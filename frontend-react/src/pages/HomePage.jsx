import React from 'react';
    import { Link } from 'react-router-dom';
    import Button from '../components/UI/Button';
    import { Building, BarChartBig, Search } from 'lucide-react';

    const HomePage = () => {
        return (
            <div className="text-center py-12 md:py-20">
                <header className="mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-sky-800 mb-4">
                        Moldova <span className="text-sky-600">Insight</span> Realty
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
                        Your non-profit gateway to understanding the Moldovan real estate market.
                        Explore property listings, analyze price trends, and get data-driven insights.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto mb-16">
                    <FeatureCard
                        icon={<Search size={40} className="text-sky-600 mb-4" />}
                        title="Explore Properties"
                        description="Browse and filter through simulated property listings from across Chișinău. Find apartments based on your criteria."
                        linkTo="/properties"
                        linkText="Search Listings"
                    />
                    <FeatureCard
                        icon={<BarChartBig size={40} className="text-sky-600 mb-4" />}
                        title="Analyze Trends"
                        description="Visualize historical price trends for different districts and property types. Make informed decisions with data."
                        linkTo="/trends"
                        linkText="View Market Trends"
                    />
                    <FeatureCard
                        icon={<Building size={40} className="text-sky-600 mb-4" />}
                        title="Get Predictions"
                        description="Access basic predictive insights for market movements. Understand potential future scenarios (simulated for MVP)."
                        linkTo="/trends" // Or a dedicated predictions page later
                        linkText="See Predictions"
                    />
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-slate-700 mb-6">Our Mission</h2>
                    <p className="text-md text-slate-600 max-w-xl mx-auto">
                        To provide a transparent, accessible, and data-driven resource for the Moldovan real estate market,
                        empowering individuals to make more informed decisions. This is an educational MVP demonstrating these concepts.
                    </p>
                </div>
                 <div className="mt-16 bg-sky-50 p-8 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold text-sky-700 mb-4">Get Started</h2>
                    <p className="text-slate-600 mb-6">Ready to dive in? Explore the features now.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button onClick={() => navigate('/properties')} size="lg" className="w-full sm:w-auto">
                            <Search size={20} className="mr-2" /> Find Properties
                        </Button>
                        <Button onClick={() => navigate('/trends')} variant="outline" size="lg" className="w-full sm:w-auto">
                            <BarChartBig size={20} className="mr-2" /> Analyze Trends
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    // Helper for feature cards on HomePage
    // eslint-disable-next-line react/prop-types
    const FeatureCard = ({ icon, title, description, linkTo, linkText }) => (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
            {icon}
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
            <p className="text-sm text-slate-600 mb-4 flex-grow">{description}</p>
            <Link to={linkTo}>
                <Button variant="outline" size="sm">{linkText}</Button>
            </Link>
        </div>
    );


    export default HomePage;
