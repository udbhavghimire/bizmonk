/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["trreb-image.ampre.ca", "query.ampre.ca", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trreb-image.ampre.ca",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "query.ampre.ca",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
