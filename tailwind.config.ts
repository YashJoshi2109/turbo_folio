import type { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  theme: {
    extend: {
      colors: {
        'cyber-black': '#0a0a0a',
        'cyber-dark': '#1c1c1e',
        'cyber-purple': '#9b59b6',
        'cyber-pink': '#ff6b81',
        'cyber-blue': '#3498db',
        'cyber-green': '#2ecc71',
        'cyber-yellow': '#f1c40f',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translatey(0)' },
          '50%': { transform: 'translatey(-10px)' },
        },
        glow: {
          '0%': { textShadow: '0 0 5px #ffffff, 0 0 10px #ffffff' },
          '50%': { textShadow: '0 0 20px #ff6b81, 0 0 30px #ff6b81' },
          '100%': { textShadow: '0 0 5px #ffffff, 0 0 10px #ffffff' },
        },
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
