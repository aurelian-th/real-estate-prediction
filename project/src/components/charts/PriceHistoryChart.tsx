import React from 'react';

interface DataPoint {
  date: string;
  price: number;
}

interface PriceHistoryChartProps {
  data: DataPoint[];
  title: string;
  color?: string;
}

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ 
  data, 
  title, 
  color = 'rgba(37, 99, 235, 1)' // Default to blue
}) => {
  // Find min and max values for scaling
  const prices = data.map(item => item.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const range = maxPrice - minPrice;

  // Calculate percentage increase from first to last point
  const percentageChange = data.length > 1 
    ? ((data[data.length - 1].price - data[0].price) / data[0].price * 100).toFixed(2)
    : 0;

  // Determine if trend is up or down
  const trendUp = data.length > 1 && data[data.length - 1].price > data[0].price;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      <div className="flex items-center mb-4">
        <span className={`text-xl font-bold ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
          {trendUp ? '+' : ''}{percentageChange}%
        </span>
        <span className="text-gray-500 ml-2 text-sm">since first record</span>
      </div>
      
      <div className="relative h-40">
        <svg width="100%" height="100%" viewBox={`0 0 ${data.length - 1} 100`} preserveAspectRatio="none">
          {/* Draw the path */}
          <path
            d={data.map((point, i) => {
              // Calculate y position (inverted because SVG y-axis is top-down)
              const y = 100 - ((point.price - minPrice) / range * 100);
              return i === 0 ? `M 0,${y}` : `L ${i},${y}`;
            }).join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="2"
            className="transition-all duration-1000 ease-out"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            style={{ animation: 'draw 2s forwards' }}
          />
          
          {/* Area under the curve with gradient */}
          <path
            d={`
              ${data.map((point, i) => {
                const y = 100 - ((point.price - minPrice) / range * 100);
                return i === 0 ? `M 0,${y}` : `L ${i},${y}`;
              }).join(' ')}
              L ${data.length - 1},100
              L 0,100
              Z
            `}
            fill={`url(#gradient-${title.replace(/\s+/g, '-')})`}
            opacity="0.2"
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Define gradient */}
          <defs>
            <linearGradient 
              id={`gradient-${title.replace(/\s+/g, '-')}`} 
              x1="0%" 
              y1="0%" 
              x2="0%" 
              y2="100%"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Show small dots at data points */}
        {data.map((point, i) => {
          const x = (i / (data.length - 1)) * 100; // x as percentage of width
          const y = 100 - ((point.price - minPrice) / range * 100); // y as percentage of height
          
          return (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white border-2"
              style={{ 
                borderColor: color,
                left: `${x}%`, 
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                opacity: 0,
                animation: `fadeIn 0.3s ${i * 0.05}s forwards` 
              }}
            />
          );
        })}
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{data[0]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};