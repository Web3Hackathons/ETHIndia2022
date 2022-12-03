/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        textColor: "#222222",
        triklBlue: "#1400FF",
        triklGray: "#9A9A9A",
        triklOffWhite: "#F8FAFC",
        lightBlue: "#bbd0ff",

        BootcampBg: "#F4F4F2",
        BootcampText: "#B722BA",
        BootcampContentBg: "#EEDFF3",

        // Other colors
        darkestBlue: "#151531",
        darkBlue: "#07004c",
        darkViolet: "#1b0033",
        lightViolet: "#c489fb",
        lightAccent: "#4ee7ff",
        blueAccent: "#1100ff",
        violetAccent: "#7209b7",
        baseWhite: "#eae1f2",
        lightGrey: "#eae1f2",
      },
    },
  },
  plugins: [],
};
