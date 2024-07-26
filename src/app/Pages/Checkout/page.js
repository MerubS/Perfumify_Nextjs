// Checkout.js
import React from 'react';

const Checkout = () => {
  const calculateSubtotal = () => {
    return 79.98; // Example subtotal
  };

  const calculateTotal = () => {
    // You can add tax or shipping calculations here
    return calculateSubtotal(); // For simplicity, using subtotal as total
  };

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row bg-gray-50 rounded-lg shadow-lg p-6 space-y-4 lg:space-y-0 lg:space-x-6 max-w-5xl w-full">
        {/* Form Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <form className="space-y-4">
            {/* Customer Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                <option>Credit Card</option>
                <option>PayPal</option>
                <option>Bank Transfer</option>
              </select>
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Place Order</button>
          </form>
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-semibold">Total:</span>
              <span className="text-xl">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
