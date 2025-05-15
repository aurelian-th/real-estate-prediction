import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component that displays the confidence level of a prediction as a gauge
 * 
 * @param {Object} props Component props
 * @param {number} props.confidence Confidence value (0-1)
 * @param {string} props.size Size of the gauge ('sm', 'md', 'lg')
 * @param {string} props.className Additional CSS classes
 * @param {boolean} props.showLabel Whether to show the confidence percentage label
 */
const PredictionConfidenceGauge = ({ 
  confidence, 
  size = 'md', 
  className = '',
  showLabel = true
}) => {
  // Validate confidence value
  const validConfidence = Math.max(0, Math.min(1, confidence));
  
  // Determine color based on confidence level
  let color;
  if (validConfidence < 0.6) {
    color = 'text-amber-500'; // Low confidence
  } else if (validConfidence < 0.8) {
    color = 'text-blue-500';  // Medium confidence
  } else {
    color = 'text-emerald-500'; // High confidence
  }
  
  // Determine size of gauge
  let sizeClass;
  switch (size) {
    case 'sm':
      sizeClass = 'w-16 h-16';
      break;
    case 'lg':
      sizeClass = 'w-32 h-32';
      break;
    case 'md':
    default:
      sizeClass = 'w-24 h-24';
  }
  
  // Calculate dash array and offset for SVG arc
  const circumference = 2 * Math.PI * 40; // r = 40
  const arcLength = circumference * 0.75; // 270 degrees (from 135° to 405°)
  const offset = arcLength * (1 - validConfidence);
  
  return (
    <div className={`${className} flex flex-col items-center`}>
      <div className={`relative ${sizeClass}`}>
        {/* Background arc */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <path
            d="M50,10 A40,40 0 1,1 49.99,10"
            fill="none"
            strokeWidth="6"
            stroke="#e2e8f0"
            strokeLinecap="round"
            className="opacity-25"
          />
          
          {/* Confidence arc */}
          <path
            d="M50,10 A40,40 0 1,1 49.99,10"
            fill="none"
            strokeWidth="6"
            className={color}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={offset}
          />
        </svg>
        
        {/* Confidence percentage in center */}
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${color} font-bold`}>
              {Math.round(validConfidence * 100)}%
            </span>
          </div>
        )}
      </div>
      
      {/* Label below gauge */}
      <div className="mt-2 text-sm text-gray-600 text-center">
        Confidence Level
      </div>
    </div>
  );
};

PredictionConfidenceGauge.propTypes = {
  confidence: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  showLabel: PropTypes.bool
};

export default PredictionConfidenceGauge;
