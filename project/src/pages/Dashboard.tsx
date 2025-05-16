import React from 'react';
import { PriceHistoryChart } from '../components/charts/PriceHistoryChart';
import { MarketDistributionChart } from '../components/charts/MarketDistributionChart';
import { InfoIcon, Download } from 'lucide-react';

export const Dashboard: React.FC = () => {
  // Sample data for charts
  const chisinauPriceHistory = [
    { date: 'Jan 2020', price: 850 },
    { date: 'Jul 2020', price: 870 },
    { date: 'Jan 2021', price: 900 },
    { date: 'Jul 2021', price: 950 },
    { date: 'Jan 2022', price: 1000 },
    { date: 'Jul 2022', price: 1080 },
    { date: 'Jan 2023', price: 1150 },
    { date: 'Jul 2023', price: 1200 },
    { date: 'Jan 2024', price: 1250 },
    { date: 'Jul 2024', price: 1300 },
    { date: 'Jan 2025', price: 1350 }
  ];
  
  const baltiPriceHistory = [
    { date: 'Jan 2020', price: 650 },
    { date: 'Jul 2020', price: 655 },
    { date: 'Jan 2021', price: 670 },
    { date: 'Jul 2021', price: 690 },
    { date: 'Jan 2022', price: 720 },
    { date: 'Jul 2022', price: 740 },
    { date: 'Jan 2023', price: 770 },
    { date: 'Jul 2023', price: 790 },
    { date: 'Jan 2024', price: 810 },
    { date: 'Jul 2024', price: 830 },
    { date: 'Jan 2025', price: 850 }
  ];
  
  const cahulPriceHistory = [
    { date: 'Jan 2020', price: 550 },
    { date: 'Jul 2020', price: 555 },
    { date: 'Jan 2021', price: 560 },
    { date: 'Jul 2021', price: 570 },
    { date: 'Jan 2022', price: 580 },
    { date: 'Jul 2022', price: 600 },
    { date: 'Jan 2023', price: 620 },
    { date: 'Jul 2023', price: 635 },
    { date: 'Jan 2024', price: 650 },
    { date: 'Jul 2024', price: 670 },
    { date: 'Jan 2025', price: 690 }
  ];
  
  const orheiPriceHistory = [
    { date: 'Jan 2020', price: 600 },
    { date: 'Jul 2020', price: 610 },
    { date: 'Jan 2021', price: 620 },
    { date: 'Jul 2021', price: 630 },
    { date: 'Jan 2022', price: 650 },
    { date: 'Jul 2022', price: 670 },
    { date: 'Jan 2023', price: 700 },
    { date: 'Jul 2023', price: 720 },
    { date: 'Jan 2024', price: 750 },
    { date: 'Jul 2024', price: 770 },
    { date: 'Jan 2025', price: 790 }
  ];
  
  const propertyTypeDistribution = [
    { label: 'Apartments', value: 65, color: '#3B82F6' },
    { label: 'Houses', value: 20, color: '#10B981' },
    { label: 'Commercial', value: 10, color: '#F59E0B' },
    { label: 'Land', value: 5, color: '#8B5CF6' }
  ];
  
  const marketTransactionDistribution = [
    { label: 'Chișinău', value: 70, color: '#3B82F6' },
    { label: 'Bălți', value: 15, color: '#10B981' },
    { label: 'Cahul', value: 8, color: '#F59E0B' },
    { label: 'Other', value: 7, color: '#8B5CF6' }
  ];
  
  // Key market indicators
  const keyIndicators = [
    { name: 'Average Price (Chișinău)', value: '€1,350/m²', change: '+7.2%', positive: true },
    { name: 'Transaction Volume', value: '15,420', change: '+3.1%', positive: true },
    { name: 'Days on Market', value: '45', change: '-12.5%', positive: true },
    { name: 'Mortgage Rate', value: '6.8%', change: '+0.5%', positive: false }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Market Dashboard</h1>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-3">Last updated: January 2025</span>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl">
          Real-time insights into Moldova's real estate market. Track price trends, regional differences, and key market indicators to make informed investment decisions.
        </p>
      </header>
      
      {/* Key Indicators */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Key Market Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyIndicators.map((indicator, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">{indicator.name}</h3>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-800">{indicator.value}</p>
                <p className={`text-sm font-medium ${indicator.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {indicator.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Price Trends */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Price Trends (€/m²)</h2>
          <div className="flex items-center text-sm text-gray-500">
            <InfoIcon className="h-4 w-4 mr-1" />
            <span>5-year price history by region</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PriceHistoryChart 
            data={chisinauPriceHistory} 
            title="Chișinău Price Trend" 
            color="rgba(59, 130, 246, 1)" // Blue
          />
          <PriceHistoryChart 
            data={baltiPriceHistory} 
            title="Bălți Price Trend" 
            color="rgba(16, 185, 129, 1)" // Green
          />
          <PriceHistoryChart 
            data={cahulPriceHistory} 
            title="Cahul Price Trend" 
            color="rgba(245, 158, 11, 1)" // Amber
          />
          <PriceHistoryChart 
            data={orheiPriceHistory} 
            title="Orhei Price Trend" 
            color="rgba(139, 92, 246, 1)" // Purple
          />
        </div>
      </section>
      
      {/* Market Distribution */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Market Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MarketDistributionChart 
            data={propertyTypeDistribution} 
            title="Property Types" 
          />
          <MarketDistributionChart 
            data={marketTransactionDistribution} 
            title="Transaction Distribution by Region" 
          />
        </div>
      </section>
      
      {/* Market Insights */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Market Insights</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Current Trends</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></div>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Rising Demand in Chișinău Suburbs:</span> As city center prices continue to climb, suburban areas are seeing increased interest with 15% growth in transaction volumes.
                  </p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></div>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">New Construction Growth:</span> Development projects are increasing by 8% annually, primarily in Chișinău's expanding districts of Botanica and Buiucani.
                  </p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></div>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Remote Work Impact:</span> Post-pandemic remote work policies have increased demand for properties with dedicated office spaces and faster internet infrastructure.
                  </p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Future Outlook</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-600 mt-2 mr-2"></div>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Predicted Price Growth:</span> Our models forecast a 5-7% annual price growth in urban areas for the next 2 years, with more moderate 3-4% growth in rural regions.
                  </p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-600 mt-2 mr-2"></div>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Interest Rate Impact:</span> Projected interest rate changes may moderate price growth in the high-end market segment by Q3 2025.
                  </p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></div>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Investment Hotspots:</span> Areas near planned infrastructure projects (particularly the Orhei-Chișinău improved road connection) show strong investment potential.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};