'use client';
import Link from "next/link";
import { useState } from "react";
import { postToApi } from "@/app/api/apiRoutes";
import { API_ENDPOINTS } from "@/app/api/endpoints";
import { useAuth } from "@/app/contexts/authProvide";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const { authState , login } = useAuth();
  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({ email: "", password: "" , signin:"" });

    let hasErrors = false;

    if (!userCredentials.email || !userCredentials.password) {
      if(!userCredentials.email){
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email cannot be empty.",
      }));
    }
    if (!userCredentials.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password cannot be empty.",
      }));
    }
      hasErrors = true;
    }

    else{
    if (!validateEmail(userCredentials.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid Email or Password",
      }));
      hasErrors = true;
    }

    if (hasErrors) return;

    try {
      const res = await postToApi(API_ENDPOINTS.LOGIN, userCredentials);
      if (res.message!='Login successful.'){
        if (res.error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            signin: res.error, 
          }));
        }
      } else {
        localStorage.setItem('token', res.token);
        console.log("Login successful");
        login(res.token);
        router.push('/Pages/ProductListing');
      }
    } catch (error) {
      console.log(error);
    }
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl text-gray-700 font-bold mt-6 text-center">Welcome Back!</h1>
        <p className="text-xl text-gray-300 text-center">Please login to your account</p>
        <form onSubmit={handleSubmit}>
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
              value={userCredentials.email}
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
              value={userCredentials.password}
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <div>
          {errors.signin && <p className="text-red-500 text-xs italic">{errors.signin}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-4">
          <p className="text-sm text-textPrimary mr-2">Don&#39;t have an account yet?</p>
          <Link href="/Pages/UserAuthentication/Registration">
            <p className="text-sm text-textPrimary font-bold">Create Account</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

