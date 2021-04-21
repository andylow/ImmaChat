module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? 'https://andylow.github.io/ImmaChat/'
    : '/',

    transpileDependencies: [
      'vuetify',
      'vue-tel-input-vuetify'
    ]
}
