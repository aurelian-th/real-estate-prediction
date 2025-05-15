import React from 'react';

    const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
        const sizes = {
            sm: 'w-6 h-6 border-2',
            md: 'w-8 h-8 border-4',
            lg: 'w-12 h-12 border-4',
        };

        return (
            <div className="flex flex-col items-center justify-center p-4">
                <div
                    className={`animate-spin rounded-full ${sizes[size]} border-sky-600 border-t-transparent`}
                ></div>
                {text && <p className="mt-3 text-sm text-slate-600">{text}</p>}
            </div>
        );
    };
    export default LoadingSpinner;
