import { useNavigate } from 'react-router-dom';

const CarCard = ({ car, onToggleWishlist, isWishlisted, darkMode }) => {
  const navigate = useNavigate();

  return (
    <div
    className={`rounded-2xl shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden ${

        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
      onClick={() => navigate(`/car/${car.id}`, { state: { darkMode } })}
    >
      {/* Image with no padding */}
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-48 object-cover"
      />

      {/* Card Content with padding */}
      <div className="p-4">
        <div className="text-lg font-semibold">{car.name}</div>
        <div className="text-sm text-gray-500 mb-2">{car.brand}</div>
        <div className="text-sm">💰 ₹{(car.price / 100000).toFixed(2)}L</div>
        <div className="text-sm">⛽ {car.fuel}</div>
        <div className="text-sm">🪑 {car.seating} Seater</div>

        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            onToggleWishlist(car.id);
          }}
          className={`mt-3 px-3 py-1 rounded-md text-sm font-medium ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
    </div>
  );
};

export default CarCard;
