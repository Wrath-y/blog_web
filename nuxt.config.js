const pkg = require('./package')
const axios = require('axios')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { name: 'google-site-verification', content: 'nMwxkFoB0em4w-P4zGMyUAHmQVP9hHpZ4Q2uewWu_0M' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'utf-8' },
    ],
    script: [
      { async: true, src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1466336567692166', crossorigin: 'anonymous' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/element-ui', ssr: true },
    { src: '~plugins/axios', ssr: true },
    { src: '~plugins/lazy-loading', ssr: true },
    { src: '~plugins/waterfall', ssr: false },
    { src: '~plugins/baidu-spider', ssr: false },
    { src: '~plugins/vue-google-adsense.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'https://wrath.cc/go/api/',
  },

  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: [
        ["component", { "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }]
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    },
    vendor: [
      'axios',
      'element-ui',
      'waterfall',
    ]
  },
  generate: {
    routes: function () {
      return axios.get('https://wrath.cc/go/api/articles/a')
        .then((res) => {
          return res.data.data.map((article) => {
            return '/articles/' + article.id
          })
        })
    }
  }
}
