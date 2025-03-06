/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // A Next.js támogatja a port megadását külön
        pathname: "/pictures/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/picture/**",
      },
    ],
  },
};

module.exports = nextConfig;
