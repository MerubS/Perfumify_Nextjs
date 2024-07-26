import Slideshow from "@/app/Components/headerImage";
import Card from "@/app/Components/card";

export default function ProductPage() {
    return (
        <>
        <Slideshow/>
        <div className="bg-secondary grid grid-cols-4 gap-4 mx-6 my-6">
        {Array.from({ length: 9 }).map((_, index) => (
            <Card
              key={index}
              title={`Product ${index + 1}`}
              price={(index + 1) * 10}
            />
          ))}
</div>

        </>
    );
}