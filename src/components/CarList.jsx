import React, { useEffect, useState } from 'react';
import cars from '../files/data';
import CarCard from './CarCard';
import Navbar from './NavBar';


const CarList = ({ darkMode, setDarkMode }) => {

  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [fuelFilter, setFuelFilter] = useState('');
  const [seatingFilter, setSeatingFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(stored);
  }, []);
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  const handleToggleWishlist = (carId) => {
    let updated;
    if (wishlist.includes(carId)) {
      updated = wishlist.filter((id) => id !== carId);
    } else {
      updated = [...wishlist, carId];
    }
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const filteredCars = cars
    .filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = brandFilter === '' || car.brand === brandFilter;
      const matchesFuel = fuelFilter === '' || car.fuel === fuelFilter;
      const matchesSeating = seatingFilter === '' || car.seating === parseInt(seatingFilter);
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      return matchesSearch && matchesBrand && matchesFuel && matchesSeating && matchesPrice;
    })
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const paginatedCars = filteredCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);
 
<Navbar darkMode={darkMode}  />

  return (
    <div
  className={`min-h-screen p-4 transition-colors duration-500 ease-in-out ${
    darkMode ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'
  }`}
>
  {/* Your content */}


    {/* 🔘 Top Bar with Theme + Sort */}
  
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Car Finder</h1>
        <div className="flex items-center gap-4">
        <button
  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
  className={`text-sm px-4 py-1.5 rounded-md font-medium transition duration-200 ease-in-out 
    ${darkMode
      ? 'bg-rose-600 text-white hover:bg-rose-700'
      : 'bg-indigo-600 text-white hover:bg-indigo-700'}
  `}
>
  Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
</button>

          

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-3 py-1 rounded transition"
            style={{
              backgroundColor: darkMode ? '#f9fafb' : '#1f2937',
              color: darkMode ? '#1f2937' : '#f9fafb',
            }}
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </div>

      {/* 🔍 Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
  <input
    type="text"
    placeholder="Search by name..."
    className={`border p-2 rounded transition ${
      darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black'
    }`}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <select
    value={brandFilter}
    onChange={(e) => setBrandFilter(e.target.value)}
    className={`border p-2 rounded transition ${
      darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black'
    }`}
  >
    <option value="">All Brands</option>
    {[...new Set(cars.map((car) => car.brand))].map((brand) => (
      <option key={brand}>{brand}</option>
    ))}
  </select>
  <select
    value={fuelFilter}
    onChange={(e) => setFuelFilter(e.target.value)}
    className={`border p-2 rounded transition ${
      darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black'
    }`}
  >
    <option value="">All Fuel Types</option>
    <option>Petrol</option>
    <option>Diesel</option>
    <option>Electric</option>
  </select>
  <select
    value={seatingFilter}
    onChange={(e) => setSeatingFilter(e.target.value)}
    className={`border p-2 rounded transition ${
      darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black'
    }`}
  >
    <option value="">All Seating</option>
    {[...new Set(cars.map((car) => car.seating))].map((seat) => (
      <option key={seat} value={seat}>{seat}</option>
    ))}
  </select>
  <select
    value={priceRange[1]}
    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
    className={`border p-2 rounded transition ${
      darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black'
    }`}
  >
    <option value={10000000}>Any Price</option>
    <option value={500000}>Below ₹5L</option>
    <option value={1000000}>Below ₹10L</option>
    <option value={1500000}>Below ₹15L</option>
    <option value={2000000}>Below ₹20L</option>
  </select>
</div>


      {/* 🚗 Car Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlist.includes(car.id)}
            darkMode={darkMode}
          />
        ))}
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          disabled={currentPage === 1}
        >
          ⬅️ Prev
        </button>
        <span className="px-3 py-1">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          disabled={currentPage === totalPages}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default CarList;
