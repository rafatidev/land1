/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // برای OpenNext
  output: 'standalone',
};

module.exports = nextConfig;