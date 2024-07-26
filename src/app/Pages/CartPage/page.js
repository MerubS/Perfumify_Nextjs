import CartItem from "@/app/Components/cartItem";
import Link from "next/link";

export default function CartPage() {
    const products = [
        { name: 'Product 1', price: 29.99, quantity: 1 },
        { name: 'Product 2', price: 49.99, quantity: 2 },
        { name: 'Product 3', price: 29.99, quantity: 1 },
        { name: 'Product 4', price: 49.99, quantity: 2 },
        { name: 'Product 5', price: 29.99, quantity: 1 },
        { name: 'Product 6', price: 49.99, quantity: 2 }
      ];
    
      const calculateSubtotal = () => {
        return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
      };
    
      const calculateTotal = () => {
        // You can add tax or shipping calculations here
        return calculateSubtotal(); // For simplicity, using subtotal as total
      };
    return (
        <>
          <div className="h-screen bg-secondary flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row bg-gray-50 rounded-lg shadow-lg p-6 space-y-4 lg:space-y-0 lg:space-x-6 max-w-5xl w-full">
        <h1 className="text-lg text-textPrimary font-semibold"> Cart </h1>
        <p className="text-lg text-textPrimary font-semibold"> Clear Cart </p>
        <div className="flex-1 bg-gray-100 p-4 h-96 overflow-auto rounded-lg">
          {products.map((product, index) => (
            <CartItem key={index} product={product} />
          ))}
        </div>

        {/* Summary Section */}
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
            <Link href="/Pages/Checkout"> <button className="bg-primary mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-700 w-full">Checkout</button> </Link>
          </div>
        </div>
      </div>
    </div>

        </>
    );
}