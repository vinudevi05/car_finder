import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CarList from './components/CarList';
import CarDetails from './components/CarDetails';
import Wishlist from './components/WishList';
import Navbar from './components/NavBar';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Optional: persist dark mode in localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme !== null) {
      setDarkMode(JSON.parse(storedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} />
      <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
        <Routes>
          <Route
            path="/"
            element={<CarList darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route path="/car/:id" element={<CarDetails darkMode={darkMode} />} />
          <Route path="/wishlist" element={<Wishlist darkMode={darkMode} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
