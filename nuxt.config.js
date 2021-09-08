require('dotenv').config()
const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  telemetry: false,
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Contact Application Leeroy',
    title: 'Contact Application Leeroy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Un test d'application pour leeroy" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://unpkg.com/tachyons@4.9.1/css/tachyons.min.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',
  /*
  ** Global CSS
  */
  css: [
    'vuetify/dist/vuetify.min.css',
    '~/assets/global.css'
  ],
  dotenv: {
    systemvars: true
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  serverMiddleware: {
    '/api': '~/api'
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/dotenv',
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': { target: 'https://front-test-lee.vercel.app/', pathRewrite: { '^/api/': '' }, changeOrigin: true }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
