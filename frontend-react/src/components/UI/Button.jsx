import React from 'react';

  const Button = ({ children, onClick, type = 'button', variant = 'primary', size = 'md', className = '', disabled = false, ...props }) => {
      const baseStyles = 'font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out inline-flex items-center justify-center';

      const variants = {
          primary: 'bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500',
          secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-700 focus:ring-slate-400',
          danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
          outline: 'bg-transparent hover:bg-sky-50 border border-sky-600 text-sky-700 focus:ring-sky-500',
      };

      const sizes = {
          sm: 'px-3 py-1.5 text-xs',
          md: 'px-4 py-2 text-sm',
          lg: 'px-6 py-2.5 text-base',
      };

      const disabledStyles = 'opacity-50 cursor-not-allowed';

      return (
          <button
              type={type}
              onClick={onClick}
              disabled={disabled}
              className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? disabledStyles : ''} ${className}`}
              {...props}
          >
              {children}
          </button>
      );
  };

  export default Button;
