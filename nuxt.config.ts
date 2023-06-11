// https://nuxt.com/docs/api/configuration/nuxt-config
import { siteUrl, apiUrl } from './utils/app.infos'

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: `${apiUrl}/analytics.js`,
          'data-project-id': 1
        }
      ]

    }
  },
  ssr: true,
  typescript: {
    strict: true,
    typeCheck: true
  },
  components: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    '@nuxtjs/google-fonts'
  ],
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
  plugins: [
  ],
  i18n: {
    baseUrl: siteUrl,
    lazy: true,
    strategy: 'prefix_except_default',
    langDir: 'locales',
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr.json',
        isCatchallLocale: true
      },
      {
        code: 'en',
        iso: 'en-Us',
        file: 'en.json'
      },
      {
        code: 'es',
        iso: 'es-ES',
        file: 'es.json'
      }
    ],
    defaultLocale: 'fr',
    detectBrowserLanguage: {
      alwaysRedirect: true,
      useCookie: true,
      cookieKey: 'dibodev-lang',
      redirectOn: 'root'
    }
  },
  devtools: {
    enabled: true
  }
})
