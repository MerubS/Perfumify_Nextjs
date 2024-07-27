import Slideshow from "@/app/Components/headerImage";
import Card from "@/app/Components/card";
import Link from "next/link";

const ProductsPage = async () => {
  let products = [];

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL); 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      products = await response.json();
    } else {
      throw new Error('Response was not JSON');
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
  return (
      <div className="flex flex-col bg-secondary min-h-screen">
      <div className="flex-shrink-0">
        <Slideshow />
      </div>
      <div className="flex-grow bg-secondary grid grid-cols-4 gap-4 mx-6 my-6">
        {products.map((product) => (
          <Link key={product.id} href={`/Pages/ProductListing/${product.id}`}>
            <Card
              title={product.title}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          </Link>
        ))}
      </div>
      </div>
  );
};

export default ProductsPage;
