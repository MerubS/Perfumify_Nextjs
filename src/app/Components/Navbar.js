"use client"
import Link from "next/link";
import { useAuth } from "../contexts/authProvide";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { authState, logout } = useAuth();
  const isAuthenticated = Boolean(authState);
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push('/Pages/UserAuthentication/LoginPage'); 
  };

    return (
        <nav className="bg-primary p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/Pages/ProductListing" className="text-xl font-extrabold font-serif">Perfumify</Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/Pages/ProductListing" className="hover:bg-gray-700 px-3 py-2 rounded">
                Home
              </Link>
              <Link href="/Pages/CartPage" className="hover:bg-gray-700 px-3 py-2 rounded">
                Cart
              </Link>
              {isAuthenticated ? (
                <>
                <Link href="/Pages/Dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
                Dashboard
              </Link>
                <button onClick={handleLogout} className="hover:bg-gray-700 px-3 py-2 rounded bg-red-600 text-white">Logout</button>
              </>
            ) : (
              <Link href="/Pages/UserAuthentication/LoginPage" className="hover:bg-gray-700 px-3 py-2 rounded">
              Login
            </Link>
            )}
            </div>
          </div>
        </div>
      </nav>
    );
  }