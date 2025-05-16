import React from 'react';
import { ArrowRight, Building, TrendingUp, BarChart4, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Homepage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg')] bg-cover bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Predict Moldova's Real Estate Market with AI Precision
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Our data-driven platform helps you make informed real estate investment decisions with accurate price predictions and market insights.
            </p>
            <Link 
              to="/prediction" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-200"
            >
              Get Your Property Valuation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Powered by Data Science & Market Research
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-blue-50 rounded-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Property Valuation</h3>
              <p className="text-gray-600">
                Get accurate price estimates based on property features, location, and current market conditions.
              </p>
            </div>
            
            <div className="p-6 bg-teal-50 rounded-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Market Predictions</h3>
              <p className="text-gray-600">
                See future price trends with our advanced predictive algorithms based on historical data analysis.
              </p>
            </div>
            
            <div className="p-6 bg-purple-50 rounded-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <BarChart4 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Data Visualization</h3>
              <p className="text-gray-600">
                Interactive charts and graphs showing market trends, price dynamics, and comparative analysis.
              </p>
            </div>
            
            <div className="p-6 bg-amber-50 rounded-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Map className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Regional Insights</h3>
              <p className="text-gray-600">
                Explore Moldova's property market by region with detailed price maps and neighborhood comparisons.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Research Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Backed by Rigorous Research</h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Our platform is built on extensive market analysis and advanced data science methodologies.
              </p>
            </div>
            <Link
              to="/research"
              className="mt-6 md:mt-0 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View Research Papers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Price Prediction Model Accuracy
              </h3>
              <div className="relative h-48 mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">94.2%</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                Our model achieves 94.2% accuracy on price predictions based on validation against historical sales data.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Data Sources & Collection
              </h3>
              <ul className="space-y-2 mb-4 pl-5 list-disc text-gray-600">
                <li>10+ years of historical property sales</li>
                <li>Database of 50,000+ Moldova properties</li>
                <li>Government property registries</li>
                <li>Real estate agency listings</li>
                <li>Economic indicators & demographic data</li>
              </ul>
              <p className="text-gray-600">
                Comprehensive data sources ensure our predictions reflect the full market reality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Research Methodology
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-gray-600">Supervised machine learning algorithms</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
                  <span className="text-gray-600">Time series analysis of price trends</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-gray-600">Geospatial modeling for location impact</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                  <span className="text-gray-600">Feature engineering for property attributes</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                  <span className="text-gray-600">Validation through cross-references</span>
                </div>
              </div>
              <p className="text-gray-600">
                Rigorous scientific methodologies ensure reliable predictions and insights.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Make Informed Real Estate Decisions?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Start using our AI-powered prediction tools today to navigate Moldova's real estate market with confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/prediction"
              className="px-8 py-3 bg-white text-blue-700 font-medium rounded-md shadow-md hover:bg-blue-50 transition-colors duration-200"
            >
              Get Property Valuation
            </Link>
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
            >
              Explore Market Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};