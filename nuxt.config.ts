// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath, URL } from 'url'
import { siteUrl, apiUrl } from '#utils/app.infos'

export default defineNuxtConfig({
    alias: {
        '#services': fileURLToPath(new URL('./services', import.meta.url)),
        '#models': fileURLToPath(new URL('./models', import.meta.url)),
        '#utils': fileURLToPath(new URL('./utils', import.meta.url)),
        '#stores': fileURLToPath(new URL('./stores', import.meta.url)),
        '#loaders': fileURLToPath(new URL('./loaders', import.meta.url)),
        '#components': fileURLToPath(new URL('./components', import.meta.url)),
        '#layouts': fileURLToPath(new URL('./layouts', import.meta.url)),
        '#pages': fileURLToPath(new URL('./pages', import.meta.url)),
        '#tools': fileURLToPath(new URL('./tools', import.meta.url))
    },
    app: {
        head: {
            script: [
                {
                    src: `${apiUrl}/analytics.js`,
                    'data-domain': 'localhost'
                },
                { src: 'https://d3js.org/d3.v3.min.js' },
                { src: 'https://d3js.org/topojson.v1.min.js' },
                { src: 'https://datamaps.github.io/scripts/datamaps.all.min.js' }
            ]

        }
    },
    css: [
        '@/assets/css/main.css'
    ],
    ssr: true,
    typescript: {
        strict: true,
        typeCheck: true
    },
    components: true,
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'nuxt-icons',
        '@nuxtjs/sitemap',
        '@nuxtjs/color-mode',
        '@nuxtjs/google-fonts'
    ],
    colorMode: {
        preference: 'system',
        fallback: 'light',
        classSuffix: ''
    },
    sitemap: {
        sources: [
            '/api/__sitemap__/urls'
        ]
    },
    googleFonts: {
        families: {
            Rubik: true
        }
    },
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate']
    },
    // app: {
    //     pageTransition: { name: 'page', mode: 'out-in' },
    //     layoutTransition: { name: 'layout', mode: 'out-in' },
    // },
    runtimeConfig: {
        indexable: true,
        public: {
            siteUrl
        }
    },
    plugins: [],
    devtools: {
        enabled: true
    }
})
