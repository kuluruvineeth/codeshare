import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "almost-black": "#161616",
        "amlost-white": "#f2f2f2",
        greyish: "#b3b3b3",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        "fira-code": ["var(--font-fira-code)", ...fontFamily.mono],
        "jetbrains-mono": ["var(--font-jetbrains-mono)", ...fontFamily.mono],
        inconsolata: ["var(--font-inconsolata)", ...fontFamily.mono],
        // "source-code-pro": ["var(--font-source-code-pro", ...fontFamily.mono],
        // "ibm-plex-mono": ["var(--font-ibm-plex-mono", ...fontFamily.mono],
      },
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    require("tailwindcss-animate"),
    require("tailwindcss-radix"),
  ],
};
export default config;
