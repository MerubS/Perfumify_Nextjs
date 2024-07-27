"use client"
import { useState } from 'react';
import { addToCart } from '../utils/addToCart'; // Ensure this path is correct

const QuantityUI = ({ product, initialQuantity = 1 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleDecrease}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
      >
        -
      </button>
      <span className="text-xl text-textPrimary font-semibold">{quantity}</span>
      <button
        onClick={handleIncrease}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
      >
        +
      </button>
      <button
        onClick={handleAddToCart}
        className="bg-primary hover:bg-textPrimary text-white font-bold py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default QuantityUI;
 