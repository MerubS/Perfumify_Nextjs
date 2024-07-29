import Image from 'next/image';
import QuantityUI from '@/app/Components/quantity';
import { notFound } from 'next/navigation';

async function fetchProduct(id) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const products = await response.json();
  const product = products.find(p => p.id === parseInt(id, 10));
  return product || null;
}

export async function generateStaticParams() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const products = await response.json();
  return products.map(product => ({
    id: product.id.toString(),
  }));
}

const ProductDetailsPage = async ({ params }) => {
  const { id } = params;
  const product = await fetchProduct(id);

  if (!product) return notFound();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md bg-white border rounded-lg shadow-lg p-6">
        <div className="relative h-96 w-full mb-6">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-xl font-semibold text-gray-800 mb-4">${product.price}</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <p className="font-bold text-lg text-gray-700">Brief:</p>
          <p className="text-lg text-gray-700">{product.briefDescription}</p>
          <p className="font-bold text-lg text-gray-700">Description:</p>
          <p className="text-lg text-gray-700">{product.description}</p>
          <p className="font-bold text-lg text-gray-700">Rating:</p>
          <p className="text-lg text-gray-700">{product.review}</p>
          <p className="font-bold text-lg text-gray-700">Quantity:</p>
          <QuantityUI product={product}/>
    </div>
    </div>
    </div>
  );
};

export default ProductDetailsPage;
