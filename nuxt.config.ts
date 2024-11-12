// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-11',
  modules: ['@nuxt/ui', 'nuxt-auth-utils', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  i18n: {
    lazy: true,
    defaultLocale: 'br',
    locales: [{
      code: 'br',
      name: 'Português',
      file: 'br.ts',
    }, {
      code: 'en',
      name: 'English',
      file: 'en.ts',
    }],
  },
})
