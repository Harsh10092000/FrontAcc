/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pri: "#FFFFF",
        sec: "#2e4e93",
        high: "#fca311",
      },
    },
  },
  plugins: [],
};
