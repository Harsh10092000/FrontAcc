/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pri: "#9f99be",
        sec: "#73628A",
      },
      // disabledbutton: {
      //   cursor: not-allowed,
      //   color: "rgb(148 163 184)",
      // },
    },
  },
  plugins: [],
};
