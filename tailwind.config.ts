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
                violet: {
                    300: '#BDB3FF', // dark primary content
                    400: '#8472F3', // dark primary
                    500: '#6B59D9', // dark primary dark and light primary
                    600: '#7162D0', // light primary dark
                    800: '#5744D5' // light primary content
                },
                slate: {
                    100: '#F5F8FF',
                    200: '#EAF0FF',
                    300: '#CFD7E6',
                    400: '#D1DAE0',
                    500: '#B9C4D5',
                    600: 'rgba(0, 0, 0, 0.3)',
                    700: 'rgba(0, 0, 0, 0.7)',
                    800: '#181339', // light text color
                    900: '#131A20'
                },
                gray: {
                    100: '#F5F4FB', // dark text color
                    200: 'rgba(255, 255, 255, 0.7)',
                    300: 'rgba(255, 255, 255, 0.3)',
                    400: '#454D5E',
                    500: '#3D4E5C',
                    600: '#35424D',
                    700: '#222B39',
                    800: '#1B232D',
                    900: '#101623'
                }

                // gray: {
                //     100: '#FAFBFF',
                //     200: '#fff',
                //     400: '#35424D',
                //     500: 'rgba(107, 114, 128, 0.15)',
                //     700: '#252f3f',
                // }
            },
            spacing: {}
        }
    }
}
