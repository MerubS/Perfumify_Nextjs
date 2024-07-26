// components/Registration.js
'use client';
import Link from "next/link"
import { useState } from "react";
export default function  Registration() {
    const [userCredentials,setUserCredentials] = useState({email:"", password:"" , cpassword:"", username:""});

  const handleInputChange = async (event) => {
    await event.preventDefault();
    const { id, value } = event.target;
    // console.log(id , value)
    setUserCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => { 
    await event.preventDefault();

    console.log("User Credentials",userCredentials);

  }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl text-gray-700 font-bold mt-6 text-center">Sign Up</h1>
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="cpassword"
                type="password"
                placeholder="********"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-primary hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-sm mt-2 text-gray-300"> Have an account? </p>
          <Link href="/Pages/UserAuthentication/LoginPage"> <p className="text-sm text-gray-300"> Login </p> </Link>
        </div>
      </div>
    )
  }
  
  