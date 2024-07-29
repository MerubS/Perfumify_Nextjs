import Image from 'next/image';

const CartItem = ({ product, onRemove }) => {
  return (
    <div className="flex items-center border-b border-gray-200 p-4 relative">
      <div className="relative h-24 w-24 mr-4">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-lg text-textPrimary font-bold">{product.title}</h2>
        <p className="text-sm text-textPrimary">Price: ${product.price}</p>
        <p className="text-sm text-textPrimary">Quantity: {product.quantity}</p>
      </div>
      { onRemove &&
      <button
        onClick={() => onRemove(product.id)}
        className="absolute top-2 right-2 bg-red-500 text-white font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        &times;
      </button>
}
    </div>
  );
};

export default CartItem;
