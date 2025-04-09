import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();

  const navLinkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-semibold transition duration-200 ease-in-out ${
      location.pathname === path
        ? darkMode
          ? 'text-rose-300 underline underline-offset-4'
          : 'text-indigo-600 underline underline-offset-4'
        : darkMode
        ? 'text-gray-300 hover:text-rose-300'
        : 'text-gray-700 hover:text-indigo-600'
    }`;
  

  return (
    <nav
      className={`sticky top-0 z-50 transition-all border-b ${
        darkMode
          ? 'bg-gray-800 border-gray-700 shadow-md'
          : 'bg-white border-gray-200 shadow'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      <h1
  className={`text-xl font-bold transition ${
    darkMode ? 'text-indigo-300' : 'text-indigo-700'
  }`}
>
  CarFinder 🚗
</h1>


        <div className="flex gap-4 items-center">
          <Link to="/" className={navLinkClass('/')}>
            Home
          </Link>
          <Link to="/wishlist" className={navLinkClass('/wishlist')}>
            Wishlist
          </Link>

          {/* Toggle Button */}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
