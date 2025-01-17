/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/Pages/ProductListing", permanent: true },
    ];
  },
  crossOrigin: "anonymous",
  images: {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
        {
          protocol: 'http',
          hostname: '**',
        },
      ],
      formats: ['image/avif'],
  },
};

export default nextConfig;
