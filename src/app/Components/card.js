import Image from "next/image";
export default function Card({title , price , image}) {
  console.log(image);
  return (
    <div className="max-w-sm rounded overflow-hidden border-2 border-primary bg-white shadow-lg">
        <div className="flex justify-center p-4">
      <div className="relative h-48 w-1/2">
        <Image
          src={image}
          alt="Product Image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>

    <div className="px-6 py-4">
      <div className="font-bold text-textPrimary text-xl mb-1">{title}</div>
      <p className="text-gray-700 text-base">${price}</p>
    </div>
  </div>

  );
}