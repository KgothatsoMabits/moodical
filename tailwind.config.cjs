/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#dbeafe',   // soft blue
          DEFAULT: '#2563eb', // main (blue-600)
          dark: '#1e40af'     // navy
        },
        accent: {
          light: '#fff7ed',
          DEFAULT: '#f59e0b', // amber-500
          dark: '#b45309'
        },
        mood: { // helper palette for cards
          warm: '#fff7ed',
          cool: '#eef2ff',
          calm: '#ecfdf5',
          energy: '#fff1f0'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui']
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' }
        },
        pop: {
          '0%': { transform: 'scale(.98)', opacity: .9 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        glow: {
          '0%': { boxShadow: '0 0 0px rgba(245,158,11,0.0)' },
          '50%': { boxShadow: '0 10px 30px rgba(245,158,11,0.08)' },
          '100%': { boxShadow: '0 0 0px rgba(245,158,11,0.0)' }
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pop: 'pop .25s ease-out',
        glow: 'glow 2.5s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
