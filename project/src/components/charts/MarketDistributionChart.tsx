import React, { useEffect, useRef } from 'react';

interface DataItem {
  label: string;
  value: number;
  color: string;
}

interface MarketDistributionChartProps {
  data: DataItem[];
  title: string;
}

export const MarketDistributionChart: React.FC<MarketDistributionChartProps> = ({ data, title }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Calculate total for percentages
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Start at the top of the circle
    let currentAngle = -0.5 * Math.PI;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up the pie chart
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Draw segments with animation
    data.forEach((item, index) => {
      setTimeout(() => {
        // Calculate the angle this segment requires
        const portionAngle = (item.value / total) * 2 * Math.PI;
        
        // Draw the segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + portionAngle);
        ctx.closePath();
        
        // Fill with the segment color
        ctx.fillStyle = item.color;
        ctx.fill();
        
        // Update current angle for next segment
        currentAngle += portionAngle;
      }, index * 150); // Stagger the animation
    });
  }, [data]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="relative w-48 h-48">
          <canvas ref={canvasRef} width="200" height="200" className="w-full h-full"></canvas>
        </div>
        
        <div className="mt-6 md:mt-0 md:ml-6">
          <ul className="space-y-2">
            {data.map((item, index) => (
              <li key={index} className="flex items-center">
                <span 
                  className="w-4 h-4 rounded-sm mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-sm text-gray-700">{item.label}</span>
                <span className="ml-auto font-medium text-gray-900">
                  {((item.value / data.reduce((sum, i) => sum + i.value, 0)) * 100).toFixed(1)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};