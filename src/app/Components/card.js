import Image from "next/image";
export default function Card({title , price}) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-primary">
    <div className="relative h-48 w-1/2">
      <Image
        src="/images/sales1.jpeg"
        alt= "Product Image"
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">{price}</p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add to Cart
      </button>
    </div>
  </div>

  );
}