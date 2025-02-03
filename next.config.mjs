/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["trreb-image.ampre.ca", "query.ampre.ca"],
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
    ],
  },
};

export default nextConfig;
