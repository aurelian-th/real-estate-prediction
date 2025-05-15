import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Card components
Card.Header = ({ children, className = '', ...props }) => (
  <div 
    className={`px-6 py-4 border-b border-gray-200 ${className}`}
    {...props}
  >
    {children}
  </div>
);

Card.Body = ({ children, className = '', ...props }) => (
  <div 
    className={`px-6 py-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

Card.Footer = ({ children, className = '', ...props }) => (
  <div 
    className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`}
    {...props}
  >
    {children}
  </div>
);

Card.Title = ({ children, className = '', ...props }) => (
  <h3 
    className={`text-xl font-semibold text-gray-800 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export default Card;
