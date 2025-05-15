import React from 'react';

 const Footer = () => {
     const currentYear = new Date().getFullYear();
     return (
         <footer className="bg-slate-800 text-slate-300 py-8 text-center">
             <div className="container mx-auto px-4">
                 <p className="text-sm">
                     &copy; {currentYear} Moldova Insight Realty (Visual MVP).
                 </p>
                 <p className="text-xs mt-1">
                     A non-profit project for educational purposes. Data presented is illustrative.
                 </p>
             </div>
         </footer>
     );
 };

 export default Footer;
