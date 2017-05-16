const path = require('path')

module.exports = {
  plugins: {
    'postcss-import': {
      path: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules')
      ]
    },
    'postcss-cssnext': {}
  }
}
