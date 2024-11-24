/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      },
      backgroundImage: {
        shimmer: 'linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%)',
      },
    },
  },
  plugins: [],
}