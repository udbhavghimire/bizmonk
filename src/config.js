const config = {
  images: {
    domains: ["bizmonk.ca"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    formats: ["image/webp"],
  },

  imageOptimization: {
    quality: 75,
    format: "webp",
    responsive: true,
  },
};

export default config;
