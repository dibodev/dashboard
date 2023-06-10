// https://nuxt.com/docs/api/configuration/nuxt-config
import { siteUrl, apiUrl } from './utils/app.infos'

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        { src: `${apiUrl}/tracker.js?id=1` }
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
    '@nuxtjs/plausible',
    '@nuxtjs/i18n',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    '@nuxtjs/google-fonts'
  ],
  sitemap: {
    autoAlternativeLangPrefixes: ['en']
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
  i18n: {
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
      cookieKey: 'i18n_redirected',
      redirectOn: 'all'
    }
  },
  devtools: {
    enabled: true
  }
})
