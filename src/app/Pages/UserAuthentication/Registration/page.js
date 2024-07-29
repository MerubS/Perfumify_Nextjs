'use client';
import Link from "next/link";
import { useState } from "react";
import { postToApi } from "@/app/api/apiRoutes";
import { useAuth } from "@/app/contexts/authProvide";
import { API_ENDPOINTS } from "@/app/api/endpoints";
import { useRouter } from "next/navigation";

export default function Registration() {
  const { login } = useAuth();
  const router = useRouter();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    cpassword: "",
    username: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    cpassword: "",
    username: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!userCredentials.username) {
      errors.username = "Username is required";
      isValid = false;
    }
    if (!userCredentials.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userCredentials.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!userCredentials.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (!passwordPattern.test(userCredentials.password)) {
      errors.password = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character";
      isValid = false;
    }

    if (userCredentials.password !== userCredentials.cpassword) {
      errors.cpassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return; 
    }

    try {
      const res = await postToApi(API_ENDPOINTS.REGISTER , userCredentials);
      if(res.message=="User added successfully") {
        localStorage.setItem('token', res.token);
        router.push('/Pages/ProductListing')
        login(res.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
              id="username"
              type="text"
              placeholder="Username"
            />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
              id="email"
              type="email"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
              id="password"
              type="password"
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpassword">
              Confirm Password
            </label>
            <input
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.cpassword ? 'border-red-500' : ''}`}
              id="cpassword"
              type="password"
              placeholder="********"
            />
            {errors.cpassword && <p className="text-red-500 text-xs italic">{errors.cpassword}</p>}
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
        <div className="flex items-center justify-center mt-4">
          <p className="text-sm text-textPrimary mr-2">Have an account?</p>
          <Link href="/Pages/UserAuthentication/LoginPage">
            <p className="text-sm text-textPrimary font-bold">Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

