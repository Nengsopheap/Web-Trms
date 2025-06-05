/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kantumruy: ['"Kantumruy Pro"', "sans-serif"],
      },
      keyframes: {
        theft: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' }, // horizontal sneak
        },
      },
      animation: {
        theft: 'theft 3s ease-in-out infinite',
      },
    },
    container: {
      center: true,
      padding: "3rem",
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};
