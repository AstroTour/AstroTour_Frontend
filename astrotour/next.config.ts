/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  
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
        pathname: "/gallery/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/avatar/**",
      },
    ],
  },
};

module.exports = nextConfig;
