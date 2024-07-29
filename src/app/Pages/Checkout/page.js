"use client"
import React, { useState , useEffect } from 'react';
import CartItem from '../../Components/cartItem';
import { loadStripe } from '@stripe/stripe-js';
import { postToApi } from '@/app/api/apiRoutes';
import { API_ENDPOINTS } from "@/app/api/endpoints";


const Checkout = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setProducts(cartItems);
  }, []);

  const fields = [
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Address', name: 'address', type: 'text' },
    { label: 'City', name: 'city', type: 'text' },
    { label: 'Province', name: 'province', type: 'text' },
    { label: 'Zip Code', name: 'zip', type: 'text' },
  ]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    province: '',
    zip: '',
    paymentMethod: 'Credit Card',
  });

  const [errors, setErrors] = useState({ name: '',
    email: '',
    address: '',
    city: '',
    province: '',
    zip: '',
    paymentMethod: 'Credit Card',});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.province) newErrors.province = 'State is required';
    if (!formData.zip) newErrors.zip = 'Zip Code is required';
    else if (!/^\d{5}$/.test(formData.zip)) newErrors.zip = 'Zip Code must be 5 digits';
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length != 0) {
      return}
    else{
    const stripe = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`);
    if (!stripe) {
      return;
    }
    try {
      if (!products) {
        throw new Error("Something went wrong");
      }
      const total = products.reduce((accumulator, currentValue) => accumulator + (currentValue.price || 0), 0).toFixed(2);
      const response = await postToApi(API_ENDPOINTS.STRIPECHECKOUT, {itineraryId: 678 , total:total} );
      
      const json = await response;
      if (!json.ok) {
        throw new Error("Something went wrong");
      }
      if (!stripe) {
        throw new Error("Something went wrong");
      }
    
      await stripe.redirectToCheckout({ sessionId: json.result.id });
    } catch (error) {
      console.log("Failed to start transaction", "Please try again.");
    }
  }
  };

  return (
    <div className="h-screen flex items-center bg-secondary justify-center p-4">
    <div className="flex flex-col lg:flex-row bg-gray-50 rounded-lg shadow-lg p-6 space-y-4 lg:space-y-0 lg:space-x-6 max-w-5xl w-full">
      
      <div className="flex-1 bg-white text-textPrimary p-6 rounded-lg shadow-md overflow-auto flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <form className="flex-1 space-y-4 flex flex-col" onSubmit={handleSubmit}>
          {fields.map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[name] ? 'border-red-500' : 'focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'}`}
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Bank Transfer</option>
            </select>
          </div>
          <div className="mt-auto"> {/* Pushes the button to the bottom */}
            <button type="submit" onClick={handleSubmit} className={`w-full px-4 py-2 rounded text-white ${
      products.length === 0
        ? 'bg-gray-300 cursor-not-allowed'
        : 'bg-primary hover:bg-gray-700'
    }`}>Place Order</button>
          </div>
        </form>
      </div>
  
      <div className="w-full lg:w-1/3 bg-primary p-6 rounded-lg shadow-md flex flex-col">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Order Summary</h3>
        <div className="flex-1 overflow-y-auto max-h-80 bg-secondary rounded-lg p-4">
          {products.map((product, index) => (
            <div key={index} className="mb-4">
              <CartItem product={product} />
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-4 text-textPrimary">
          <span className="font-medium">Subtotal:</span>
          <span>  ${products.reduce((accumulator, currentValue) => 
        accumulator + (currentValue.price || 0), 0).toFixed(2)} </span>
        </div>
        <div className="flex justify-between mt-2 text-textPrimary">
          <span className="font-medium">Shipping:</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between border-t border-textPrimary pt-2 mt-4 text-textPrimary">
          <span className="font-semibold">Total:</span>
          <span className="text-xl">${products.reduce((accumulator, currentValue) => 
        accumulator + (currentValue.price || 0), 0).toFixed(2)}</span>
        </div>
      </div>
  
    </div>
  </div>
  

  );
};

export default Checkout;
