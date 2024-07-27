"use client"
import { useEffect, useState } from 'react';
import CartItem from "@/app/Components/cartItem";
import { useRouter } from 'next/navigation'; 

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setProducts(cartItems);
  }, []);

  const removeProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
  };

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setProducts([]);
  } 

  const calculateSubtotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const handleCheckoutClick = () => {
    if (products.length === 0) {
      alert('Your cart is empty!');
    } else {
      router.push('/Pages/Checkout'); 
    }
  };

  return (
    <div className="h-screen bg-secondary flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row bg-gray-50 rounded-lg shadow-lg p-6 space-y-4 lg:space-y-0 lg:space-x-6 max-w-5xl w-full">
        <div className="flex-1 bg-gray-100 p-4 h-96 overflow-auto rounded-lg">
          {products.length > 0 ? (
            products.map((product) => (
              <CartItem key={product.id} product={product} onRemove={removeProduct} />
            ))
          ) : (
            <p className="text-center text-gray-600">Your cart is empty</p>
          )}
        </div>

        <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow-md h-44">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <h3 className="text-lg text-textPrimary font-semibold">Subtotal:</h3>
              <p className="text-textPrimary text-xl">${calculateSubtotal()}</p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-lg text-textPrimary font-semibold">Total:</h3>
              <p className="text-textPrimary text-xl">${calculateTotal()}</p>
            </div>
            <button
              onClick={handleCheckoutClick}
              className={`mt-4 px-4 py-2 text-white rounded w-full ${products.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-gray-700'}`}
              disabled={products.length === 0}
            > Checkout
            </button>
          </div>
          <div className="w-full flex justify-end mt-6">
          <button
            onClick={handleClearCart}
            className="text-lg text-red-500 font-semibold mt-3"
          >
            Clear Cart
          </button>
        </div>
        </div>

      </div>
    </div>
  );
}
