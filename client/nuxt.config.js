export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  target: 'static',
  ssr: false,
  generate: {
    fallback: true,
  },

  head: {
    title: 'mongo-ecommerce',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/fonts.css', '~/assets/css/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/route', '~/plugins/toast-notification'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  googleFonts: {
    display: 'swap',
    download: true,
    stylePath: 'css/fonts.css',
    families: {
      Roboto: true,
    },
  },

  fontawesome: {
    icons: {
      solid: [
        'faShoppingCart',
        'faSearch',
        'faPlus',
        'faMinus',
        'faTimes',
        'faFilter',
        'faArrowRight',
        'faHistory',
      ],
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://mongodb-ecommerce.herokuapp.com', // Used as fallback if no runtime config is provided
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    baseURL: 'https://mongodb-ecommerce.herokuapp.com/',
  },
}
