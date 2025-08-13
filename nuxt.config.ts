// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devServer: {
    port: 3002
  },
  nitro: {
    preset: 'static',
    prerender: {
      // 暂时禁用预渲染以避免 API 调用问题
      routes: [],
      // 忽略动态路由
      ignore: ['/admin', '/api'],
      // 失败时继续
      failOnError: false,
      // 自动发现链接
      crawlLinks: false,
    },
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    // '@nuxtjs/i18n',
    '@nuxt/ui',
  ],
  ui: {
    // 禁用 Google Fonts
    fonts: false,
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://admin.gdyunzhu.com/api',
    },
  },
})
