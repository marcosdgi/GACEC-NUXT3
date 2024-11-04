// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/color-mode'
  ],
  imports: {
    dirs: ["stores"]
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "GACEC | 1.0.0",
    }
  },
  ssr: false,
  css: ['~/assets/icons/style.css', 'vue-final-modal/style.css'],
  runtimeConfig: {
    public: {
      apiURL: process.env.API_BASE_URL,
      rollbarToken: process.env.ROLLBAR_TOKEN,
    },
  },
  router: {
    options: {}
  },
  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  
})
