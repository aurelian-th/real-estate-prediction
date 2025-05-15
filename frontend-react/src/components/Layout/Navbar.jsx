import React from 'react';
   import { Link, useNavigate } from 'react-router-dom';
   import { Home, Building2, BarChart3, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
   import { useAuth } from '../../contexts/AuthContext';
   import Button from '../UI/Button';

   const Navbar = () => {
       const { isAuthenticated, user, logout } = useAuth();
       const navigate = useNavigate();

       const handleLogout = () => {
           logout();
           navigate('/');
       };

       return (
           <nav className="bg-sky-700 text-white shadow-lg sticky top-0 z-50">
               <div className="container mx-auto px-4">
                   <div className="flex items-center justify-between h-16">
                       <Link to="/" className="text-2xl font-bold hover:text-sky-200 transition-colors">
                           Moldova<span className="text-sky-300">Insight</span>Realty
                       </Link>
                       <div className="flex items-center space-x-2 md:space-x-4">
                           <NavLinkItem to="/" icon={<Home size={18} />} label="Home" />
                           <NavLinkItem to="/properties" icon={<Building2 size={18} />} label="Properties" />
                           <NavLinkItem to="/trends" icon={<BarChart3 size={18} />} label="Trends & Predictions" />

                           {isAuthenticated ? (
                               <>
                                   <NavLinkItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
                                   <Button onClick={handleLogout} variant="secondary" size="sm" className="flex items-center">
                                       <LogOut size={18} className="mr-1 md:mr-2" />
                                       <span className="hidden sm:inline">Logout</span> ({user?.fullName?.split(' ')[0] || user?.email})
                                   </Button>
                               </>
                           ) : (
                               <>
                                   <NavLinkItem to="/login" icon={<LogIn size={18} />} label="Login" />
                                   <NavLinkItem to="/register" icon={<UserPlus size={18} />} label="Register" />
                               </>
                           )}
                       </div>
                   </div>
               </div>
           </nav>
       );
   };

   const NavLinkItem = ({ to, icon, label }) => (
       <Link
           to={to}
           className="flex items-center px-2 py-2 md:px-3 text-sm font-medium rounded-md hover:bg-sky-600 transition-colors"
       >
           {icon}
           <span className="ml-1 md:ml-2 hidden sm:inline">{label}</span>
       </Link>
   );

   export default Navbar;
