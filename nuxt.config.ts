import process from 'node:process'
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-04-10',
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
    'nuxt-svgo',
    '@nuxthub/core',
  ],
  hub: {
    database: true,
  },
  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD,
    databaseDir: resolve('./server/database'),
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
})
