/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["query.ampre.ca", "images.unsplash.com", "trreb-image.ampre.ca"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "query.ampre.ca",
        port: "",
        pathname: "/odata/Media/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trreb-image.ampre.ca",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
