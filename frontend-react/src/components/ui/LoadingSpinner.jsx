import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  // Size classes based on the size prop
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-10 w-10 border-3',
    large: 'h-16 w-16 border-4'
  };
  
  // Text size classes based on the size prop
  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div 
        className={`animate-spin rounded-full border-t-transparent border-blue-600 ${sizeClasses[size] || sizeClasses.medium}`}
      />
      {text && (
        <p className={`mt-3 text-gray-600 ${textSizeClasses[size] || textSizeClasses.medium}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
