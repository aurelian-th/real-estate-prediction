import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ResearchCardProps {
  title: string;
  author: string;
  date: string;
  abstract: string;
  imageUrl: string;
  link: string;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({
  title,
  author,
  date,
  abstract,
  imageUrl,
  link
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight">{title}</h3>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{abstract}</p>
        
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          Read full research
          <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};