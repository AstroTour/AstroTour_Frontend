/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Képek configja marad változatlan
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
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
