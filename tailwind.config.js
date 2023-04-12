/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: "#0F1211",
      gray: "#e5e7eb",
      purple: "#6644FF",
    },
    extend: {
      fontFamily: {
        Sora: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [],
};
