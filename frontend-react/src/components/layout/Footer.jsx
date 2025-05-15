import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Moldova Insight Realty</h2>
            <p className="text-gray-300 mb-4">
              Providing transparent real estate data and insights for Chișinău, Moldova.
              Make informed property decisions with our market trends and predictions.
            </p>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Moldova Insight Realty. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-white transition">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/trends" className="text-gray-300 hover:text-white transition">
                  Trends & Predictions
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Chișinău, Republic of Moldova</li>
              <li>Email: info@moldovainsight.md</li>
              <li>Phone: +373 22 123 456</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-xs">
            Disclaimer: This is a student project MVP. The data presented is for demonstration purposes
            and may not reflect actual market conditions. No real transactions should be based solely on this information.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
