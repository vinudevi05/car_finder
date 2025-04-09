import React, { useEffect, useState } from 'react';
import cars from '../files/data';
import CarCard from './CarCard';

const Wishlist = ({ darkMode }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(stored);
  }, []);

  const handleToggleWishlist = (carId) => {
    const updated = wishlist.includes(carId)
      ? wishlist.filter((id) => id !== carId)
      : [...wishlist, carId];

    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const wishlistedCars = cars.filter((car) => wishlist.includes(car.id));

  return (
    <div
      className={`p-4 min-h-screen transition ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>

      {wishlistedCars.length === 0 ? (
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistedCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlist.includes(car.id)}
              darkMode={darkMode} // Pass darkMode to CarCard if needed
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
