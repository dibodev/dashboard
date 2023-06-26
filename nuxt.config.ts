// https://nuxt.com/docs/api/configuration/nuxt-config
import { siteUrl, apiUrl } from './utils/app.infos'

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: `${apiUrl}/analytics.js`,
          'data-domain': 'dibodev.com'
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
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts'
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },
  sitemap: {
    // xsl: false
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
