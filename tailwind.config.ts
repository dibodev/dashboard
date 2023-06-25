module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: 'Rubik, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '70rem',
        '2xl': '70rem'
      }
    },
    extend: {
      colors: {
        primary: '#f00',
        gray: {
          500: 'rgba(107, 114, 128, 0.15)',
          700: '#252f3f',
          900: '#1a202c'
        }
      },
      spacing: {
      }
    }
  }
}
