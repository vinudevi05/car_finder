import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import cars from '../files/data';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === parseInt(id));
  const location = useLocation(); // 👈 this must come before using location
  const darkMode = location.state?.darkMode || false;
  
  if (!car) {
    return (
      <div className={`p-6 text-center ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
        Car not found
      </div>
    );
  }

  return (
    <div
      className={`max-w-3xl mx-auto p-6 rounded-2xl shadow-lg transition-all duration-500 ease-in-out ${
        darkMode ? 'bg-[#1f1f1f] text-white' : 'bg-white text-black'
      }`}
    >
      <button
        onClick={() => navigate(-1)}
        className={`mb-4 text-sm font-medium underline transition ${
          darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
        }`}
      >
        ← Back
      </button>

      <img
        src={car.image}
        alt={car.name}
        className="w-full h-auto max-h-[500px] object-contain rounded-xl mb-4 bg-white shadow-sm"
      />

      <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
      <p className={`text-lg mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Brand: {car.brand}
      </p>
      <p className={`text-lg mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Fuel: {car.fuel}
      </p>
      <p className={`text-lg mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Seating: {car.seating}
      </p>
      <p className={`text-lg mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Price: <strong>₹{(car.price / 100000).toFixed(2)} Lakhs</strong>
      </p>

      <div
        className={`p-4 rounded-lg mt-4 transition ${
          darkMode ? 'bg-[#2a2a2a] text-gray-200' : 'bg-gray-100 text-gray-800'
        }`}
      >
        <h2 className="font-semibold text-xl mb-2">Features</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Airbags</li>
          <li>ABS with EBD</li>
          <li>Touchscreen Infotainment</li>
          <li>Reverse Camera</li>
          <li>Automatic Climate Control</li>
        </ul>
      </div>
    </div>
  );
};

export default CarDetails;
