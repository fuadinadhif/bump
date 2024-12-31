import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "primary-black": "#1A093E",
        "primary-grey": "#787282",
        "secondary-grey": "#efeef5",
        "primary-blue": "#5b5daa",
        "secondary-blue": "#cdcdf1",
      },
    },
  },
  plugins: [],
} satisfies Config;
