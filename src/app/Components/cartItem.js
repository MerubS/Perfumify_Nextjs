import Image from "next/image";

export default function CartItem ({ product }) {
    return (
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-16 h-16 relative mr-4">
            <Image 
              src="/images/sales1.jpeg"
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">Quantity: {product.quantity}</p>
          </div>
        </div>
        <div className="text-lg font-semibold">${product.price}</div>
      </div>
    )
  }