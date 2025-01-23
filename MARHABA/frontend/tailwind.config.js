/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E77B2D', // Orange comme Bricozor
          dark: '#D15E15',
          light: '#F4A364',
        },
        secondary: {
          DEFAULT: '#2B3440', // Bleu foncé/gris comme Deflandre
          light: '#4A5568',
          dark: '#1A202C',
        },
        background: {
          DEFAULT: '#F8F9FA',
          dark: '#EDF2F7',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#F7FAFC',
        },
        text: {
          DEFAULT: '#2D3748',
          light: '#4A5568',
          muted: '#718096',
        },
        success: '#48BB78',
        error: '#F56565',
        warning: '#ED8936',
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0,0,0,0.1)',
        'hover': '0 4px 6px rgba(0,0,0,0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

