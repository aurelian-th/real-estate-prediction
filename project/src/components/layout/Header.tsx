import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Menu, X, LogOut, LogIn, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // Define navigation items conditionally based on authentication
  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Prediction Tool', path: '/prediction' },
    { name: 'Market Research', path: '/research' },
    { name: 'Property Comparison', path: '/comparison' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-800">MoldovaRealEstate.AI</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center transition-colors duration-200 ${
                    location.pathname === '/dashboard'
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-blue-500'
                  }`}
                >
                  <User className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="flex items-center text-gray-600 hover:text-red-500 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-600 hover:text-blue-500 transition-colors duration-200"
              >
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </Link>
            )}
          </nav>

          <button
            className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 px-4 bg-white rounded-lg shadow-lg">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`block py-2 px-2 rounded ${
                      location.pathname === item.path
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className={`flex items-center py-2 px-2 rounded ${
                        location.pathname === '/dashboard'
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-2" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left py-2 px-2 rounded text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="flex items-center py-2 px-2 rounded text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};