/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "600px",
        md: "600px",
        lg: "600px",
        xl: "600px",
        "2xl": "600px",
      },
    },
  },
  plugins: [],
};
