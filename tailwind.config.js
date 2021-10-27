module.exports = {
  // purge: [],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // transparent: "transparent",
      // current: "currentColor",
      orange: "#ef4831",
      gray: "#aca4a3",
      coffe: "#562b23",
      black: "#231f1c",
      pink: "#e49b8f",
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
