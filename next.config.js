/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactRoot: true,
    runtime: "nodejs",
    serverComponents: true,
  },
  images: {
    domains: ["imagedelivery.net"],
  },
};

module.exports = nextConfig;
