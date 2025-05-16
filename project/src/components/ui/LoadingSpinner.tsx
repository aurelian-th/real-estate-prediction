import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'primary',
  className = ''
}) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-3'
  };

  const colorClasses = {
    primary: 'border-blue-500 border-t-transparent',
    white: 'border-white border-t-transparent'
  };
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

export default LoadingSpinner;
