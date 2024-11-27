import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      purpledark: "#280050",
    }, 
    fontFamily:{
      title: ['AuxMono'],
      body: ['DepartureMono']
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
        "purple-dark":{
          layout:{
            fontSize:{
              large: "1.125rem",
              medium: "0.875rem",
              small: "0.75rem"
            }
          },
          colors:{
            //PAGE COLOR
            background:{
              DEFAULT: 'hsl(240, 50%, 10%)'
            },
            //TEXT
            foreground:{
              600: 'hsl(240, 50%, 80%)',
              DEFAULT: 'hsl(240, 50%, 90%)'
            },
            //CARDS
            content1:{
              300: 'hsl(240, 50%, 30%)',
              DEFAULT: 'hsl(240, 50%, 15%)'
            },
            //BUTTONS/EMPHASIZE TEXT
            content2:{
              DEFAULT: 'hsl(300, 80%, 80%)',
              foreground: 'hsl(240, 50%, 10%)'
            }
          }
          
        }, // ... custom themes
      } 
    },
    
  )],
};
export default config;
