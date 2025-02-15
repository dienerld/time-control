import process from 'node:process'
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-11',
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt-marquee',
    '@vueuse/motion/nuxt',
    'nuxt-svgo',
  ],
  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD,
    databaseDir: resolve('./server/database'),
    tursoDBURL: process.env.TURSO_DB_URL,
    tursoDBToken: process.env.TURSO_DB_TOKEN,
    nodeEnv: process.env.NODE_ENV,
    public: {
      contact: {
        email: process.env.CONTACT_EMAIL,
      },
    },
  },
  css: ['~/assets/css/main.css'],
  svgo: {
    componentPrefix: 'I',
    autoImportPath: '~/assets/svg',
  },
  i18n: {
    lazy: true,
    defaultLocale: 'pt_br',
    locales: [{
      code: 'pt_br',
      name: 'Português',
      file: 'pt-BR.ts',
    }, {
      code: 'en',
      name: 'English',
      file: 'en.ts',
    }],
  },
})
