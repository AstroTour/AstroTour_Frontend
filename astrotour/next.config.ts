/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "devsite.monvoie.com", // Engedélyezzük a külső képeket
          pathname: "/pictures/**", // Ellenőrizd, hogy a képek itt érhetőek-e el
        },
        {
          protocol: "http",
          hostname: "devsite.monvoie.com", 
          pathname: "/picture/**", // Ha a Laravel "storage" mappában tárolja a képeket
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  