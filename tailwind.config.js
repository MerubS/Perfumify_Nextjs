/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['serif', 'sans-serif'],
        // Add more custom fonts here
      },
      colors: {
        primary: '#c1e1c1',    
        secondary: '#FFFFFF',  
        accent: '#e3342f',     
        background: '#f8fafc', 
        textPrimary: '#000000',       
      },
    },
  },
  plugins: [],
};
