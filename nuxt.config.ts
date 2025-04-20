import process from 'node:process'
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-04-10',
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
    'nuxt-svgo',
    '@nuxthub/core',
    '@vueuse/nuxt',
    'nuxt-mcp',
  ],
  hub: {
    database: true,
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
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
