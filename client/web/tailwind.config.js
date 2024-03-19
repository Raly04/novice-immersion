/** @format */

// tailwind.config.js
import { nextui } from "@nextui-org/react";

const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ii: "#52a7ffe3",
        iii: "#ff004d",
        iiii: "#ffbc00",
        primary: "#A3FDA1",
        secondary: "#925FF0",
        tertiary: "#2D2D2D",
        back: "#0B0B0B",
        txt: "rgba(255, 255, 255, 0.675)",
        pink: "rgba(231, 32, 198, 0.796)",
        orBack : "#18181b",
        modalDarkBack : "#2828289e"
      },
      fontFamily: {
        body: ["Gabarito"],
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
    },
  },
  darkMode: "class",
  plugins: [addVariablesForColors, nextui()],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export const darkMode = "class";
export const plugins = [nextui()];
