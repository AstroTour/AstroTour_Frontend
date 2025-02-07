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

      // ✅ ÚJ ANIMÁCIÓK HOZZÁADÁSA (Bolygók mozgása)
      animation: {
        'fly-through-space': 'flyThroughSpace 3s ease-in-out forwards',
        orbit: "orbit 10s linear infinite",
      },

      keyframes: {
        flyThroughSpace: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '50%': { transform: 'translateY(-200px) translateX(100px) scale(1.2)' },
          '100%': { transform: 'translateY(-500px) translateX(300px) scale(0)' },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(var(--distance)) translateY(var(--eccentricity)) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(var(--distance)) translateY(var(--eccentricity)) rotate(-360deg)" },
        },
      },

      darkMode: 'class',
    },
  },

  plugins: [require('tailwind-hamburgers')],
} satisfies Config;
