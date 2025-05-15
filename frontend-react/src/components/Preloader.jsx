import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="text-blue-600 mb-4">
          <svg width="80" height="80" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>Moldova Insight Realty Logo</title>
            <g stroke="none" fill="none">
              <rect fill="currentColor" x="0" y="0" width="32" height="32" rx="6"></rect>
              <path d="M16,5 L26,12 L26,25 C26,25.5523 25.5523,26 25,26 L7,26 C6.44772,26 6,25.5523 6,25 L6,12 L16,5 Z" stroke="#FFFFFF" strokeWidth="2"></path>
              <rect fill="#FFFFFF" x="12" y="18" width="8" height="8" rx="1"></rect>
              <rect fill="#FFFFFF" x="14" y="13" width="4" height="3" rx="1"></rect>
            </g>
          </svg>
        </div>
        <div className="text-xl font-semibold text-gray-800 mb-2">
          Moldova Insight Realty
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mt-2"></div>
      </div>
    </div>
  );
};

export default Preloader;
