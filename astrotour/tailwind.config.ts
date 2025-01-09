import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'fly-through-space': 'flyThroughSpace 3s ease-in-out forwards', // Animáció hozzáadása
      },
      keyframes: {
        flyThroughSpace: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '50%': { transform: 'translateY(-200px) translateX(100px) scale(1.2)' },
          '100%': { transform: 'translateY(-500px) translateX(300px) scale(0)' },
        },
      },
    },
  },

  plugins: [require('tailwind-hamburgers')],
} satisfies Config;
