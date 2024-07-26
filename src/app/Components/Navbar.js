import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-primary p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-xl font-extrabold font-serif">Perfumify</Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/Pages/ProductListing" className="hover:bg-gray-700 px-3 py-2 rounded">
                Home
              </Link>
              <Link href="/Pages/CartPage" className="hover:bg-gray-700 px-3 py-2 rounded">
                Cart
              </Link>
              <Link href="/Pages/UserAuthentication/LoginPage" className="hover:bg-gray-700 px-3 py-2 rounded">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }