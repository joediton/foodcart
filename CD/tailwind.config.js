/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        dark: "#000000",
        light: "#efa0cd",
      },
    },
  },
  safelist: [
    "css-144pkfb-MuiBottomNavigationAction-label",
    "css-i4bv87-MuiSvgIcon-root",
    "css-26zcom-MuiPaper-root-MuiAccordion-root",
    "css-1w9ogfc-MuiButtonBase-root-MuiButton-root",
    "css-zptu2e-MuiFormLabel-root-MuiInputLabel-root",
    "css-vn4swy-MuiFormLabel-root",
    "css-myb2s4-MuiInputBase-input-MuiOutlinedInput-input",
    "css-4wdd6p-MuiBottomNavigation-root",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
};
