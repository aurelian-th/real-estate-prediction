import React from 'react';

   const Card = ({ children, className = '', shadow = 'md', rounded = 'lg', padding = 'p-4 md:p-6' }) => {
       const shadowVariants = {
           sm: 'shadow-sm',
           md: 'shadow-md',
           lg: 'shadow-lg',
           xl: 'shadow-xl',
           none: 'shadow-none',
       };

       const roundedVariants = {
           sm: 'rounded-sm',
           md: 'rounded-md',
           lg: 'rounded-lg',
           xl: 'rounded-xl',
           full: 'rounded-full',
           none: 'rounded-none',
       };

       return (
           <div className={`bg-white ${shadowVariants[shadow]} ${roundedVariants[rounded]} ${padding} ${className}`}>
               {children}
           </div>
       );
   };

   export default Card;
