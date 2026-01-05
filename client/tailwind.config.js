// tailwind.config.js
export default {
  theme: {
    extend: {
      animation: {
        slideUp: "slideUp 0.3s ease-out",
        'border-spin': 'border-spin 3s linear infinite',
        'border-gradient': 'border-gradient 3s linear infinite',
      },
      keyframes: {
        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        'border-spin': {
          '0%': { 
            backgroundPosition: '0% 50%',
          },
          '50%': { 
            backgroundPosition: '100% 50%',
          },
          '100%': { 
            backgroundPosition: '0% 50%',
          },
        },
        'border-gradient': {
          '0%': { 
            '--gradient-angle': '0deg',
          },
          '100%': { 
            '--gradient-angle': '360deg',
          },
        }
      },
      colors: {
        "primary-btn": "#27bb97",
        "primary-btn-hover": "#1fa987",
        "secondary-blue": "#2d7dd7",
      },
      fontFamily: {
        'parisienne': ['Parisienne', 'cursive'],
        'indie-flower': ['Indie Flower', 'cursive'],
      },
      animation: {
        'rotate-it': 'rotate-it 60s linear infinite',
      },
      keyframes: {
        'rotate-it': {
          'to': { transform: 'rotate(360deg)' },
        },
      },
      filter: {
        'invert-75': 'invert(75%)',
      },
      rotate: {
        '15': '15deg',
      },
      scale: {
        '35': '0.35',
        '60': '0.6',
      },
    },
  },
};