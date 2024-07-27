/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/Pages/ProductListing", permanent: true },
    ];
  },
  crossOrigin: "anonymous",
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
