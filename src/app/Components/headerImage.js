import Image from "next/image";
export default function HeaderImage() {
  return (
    <div className="relative w-full h-96">
      <Image
        src="/images/headerimage.avif"
        alt="Sales"
        layout="fill"
        objectFit="cover"
        className="w-full h-full"
      />
    </div>

  );
}
