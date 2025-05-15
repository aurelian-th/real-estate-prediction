import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * A component that displays the price growth rate with a visual indicator
 * 
 * @param {Object} props Component props
 * @param {number} props.growthRate Growth rate percentage
 * @param {string} props.period Text describing the period (e.g., "over 12 months")
 * @param {string} props.size Size of the component ('sm', 'md', 'lg')
 * @param {string} props.className Additional CSS classes
 */
const PriceGrowthIndicator = ({ 
  growthRate, 
  period = '', 
  size = 'md',
  className = '' 
}) => {
  // Format growth rate for display
  const formattedRate = Math.abs(growthRate).toFixed(1);
  const isPositive = growthRate >= 0;
  
  // Determine color based on growth rate
  let textColor, bgColor;
  if (isPositive) {
    textColor = 'text-green-600';
    bgColor = 'bg-green-50';
  } else {
    textColor = 'text-red-600';
    bgColor = 'bg-red-50';
  }
  
  // Determine icon and text size based on component size
  let iconSize, textSize;
  switch (size) {
    case 'sm':
      iconSize = 14;
      textSize = 'text-xs';
      break;
    case 'lg':
      iconSize = 20;
      textSize = 'text-base';
      break;
    case 'md':
    default:
      iconSize = 16;
      textSize = 'text-sm';
  }
  
  return (
    <div className={`${className} inline-flex items-center ${textSize} ${textColor} ${bgColor} rounded-full px-2.5 py-1`}>
      {isPositive ? (
        <TrendingUp size={iconSize} className="mr-1" />
      ) : (
        <TrendingDown size={iconSize} className="mr-1" />
      )}
      <span className="font-medium">
        {isPositive ? '+' : '-'}{formattedRate}%
      </span>
      {period && <span className="ml-1 opacity-80">{period}</span>}
    </div>
  );
};

PriceGrowthIndicator.propTypes = {
  growthRate: PropTypes.number.isRequired,
  period: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

export default PriceGrowthIndicator;
