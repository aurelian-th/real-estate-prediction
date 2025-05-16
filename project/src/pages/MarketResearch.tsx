import React from 'react';
import { ResearchCard } from '../components/ui/ResearchCard';

export const MarketResearch: React.FC = () => {
  const researchPapers = [
    {
      id: 1,
      title: "Forecasting Real Estate Prices in Moldova: A Machine Learning Approach",
      author: "Dr. Alina Popescu, Technical University of Moldova",
      date: "May 2025",
      abstract: "This research applies various machine learning algorithms to predict real estate price movements in Moldova's urban areas. Using a dataset of 15,000 property transactions spanning 2015-2025, we demonstrate that ensemble models outperform traditional regression methods with 94.2% accuracy.",
      imageUrl: "https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg",
      link: "#research-1"
    },
    {
      id: 2,
      title: "Economic Factors Influencing Housing Market in Chișinău: A Time Series Analysis",
      author: "Prof. Ion Dimitrov, Moldova State University",
      date: "March 2025",
      abstract: "This study examines key economic indicators affecting Chișinău's residential real estate market from 2010-2025. Using ARIMA models, we identify GDP growth, interest rates, and foreign investment as primary drivers, with the added finding that socio-political stability has an outsized impact compared to other European capitals.",
      imageUrl: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg",
      link: "#research-2"
    },
    {
      id: 3,
      title: "Neighborhood Price Dynamics in Moldova: A Spatial Econometric Study",
      author: "Dr. Maria Cojocaru, Institute of Economic Research",
      date: "February 2025",
      abstract: "This spatial analysis identifies price clustering patterns across Moldova's municipalities. Using geospatial modeling techniques, we demonstrate that proximity to education facilities, transportation hubs, and retail centers are key value determinants with varying influences depending on the region.",
      imageUrl: "https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg",
      link: "#research-3"
    },
    {
      id: 4,
      title: "Impact of EU Association Agreement on Moldova's Real Estate Market",
      author: "Dr. Vasile Lungu & Dr. Natalia Bogdan",
      date: "January 2025",
      abstract: "This longitudinal study examines how European integration processes have influenced property markets across Moldova since 2014. We find evidence of gradual price convergence with EU border regions and increased foreign investment in commercial real estate, particularly in urban centers.",
      imageUrl: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg",
      link: "#research-4"
    },
    {
      id: 5,
      title: "Market Sentiment Analysis for Real Estate Forecasting in Moldova",
      author: "Dr. Victor Popov, Data Science Research Center",
      date: "November 2024",
      abstract: "This innovative study combines natural language processing of online property listings with traditional market indicators. By analyzing sentiment in 50,000+ listings from 999.md and other platforms, we demonstrate improved prediction accuracy when incorporating textual data into forecasting models.",
      imageUrl: "https://images.pexels.com/photos/7075/people-office-group-team.jpg",
      link: "#research-5"
    },
    {
      id: 6,
      title: "Rural vs. Urban Real Estate Development in Moldova: Comparative Analysis",
      author: "Prof. Ana Codreanu, Academy of Economic Studies",
      date: "October 2024",
      abstract: "This research compares price evolution between rural and urban properties in Moldova from 2010-2024. We identify diverging trends with urban appreciation outpacing rural areas, though select agricultural regions near the Romanian border show increasing development potential.",
      imageUrl: "https://images.pexels.com/photos/235615/pexels-photo-235615.jpeg",
      link: "#research-6"
    }
  ];

  const methodologies = [
    {
      title: "Data Collection",
      description: "Comprehensive dataset of 50,000+ properties across Moldova, including historical sales data, property attributes, and location information."
    },
    {
      title: "Machine Learning Models",
      description: "Ensemble algorithms combining gradient boosting, random forests, and neural networks to capture complex market patterns."
    },
    {
      title: "Validation Methods",
      description: "Cross-validation techniques ensuring prediction accuracy across different regions and property types."
    },
    {
      title: "Market Sentiment Analysis",
      description: "Natural language processing of listing descriptions to extract sentiment indicators influencing market trends."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Market Research & Publications</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our platform is built on rigorous research and data analysis. Explore our latest publications on Moldova's real estate market dynamics.
        </p>
      </header>
      
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Research Methodology</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Our Approach</h3>
              <p className="text-gray-700 mb-4">
                Our research combines traditional econometric methods with advanced machine learning techniques to develop accurate predictive models for Moldova's real estate market.
              </p>
              <p className="text-gray-700">
                By integrating multiple data sources and applying rigorous statistical validation, we provide insights that help investors, homeowners, and policy makers make informed decisions.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Key Components</h3>
              <ul className="space-y-3">
                {methodologies.map((item, index) => (
                  <li key={index} className="flex">
                    <div className="mr-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <span className="text-blue-600 font-medium">{index + 1}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Recent Publications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchPapers.map(paper => (
            <ResearchCard key={paper.id} {...paper} />
          ))}
        </div>
      </section>
    </div>
  );
};