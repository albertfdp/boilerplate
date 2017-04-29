const webpackConfig = require('./webpack.config.dev');

module.exports = {
  title: 'Boilerplate Style Guide',
  components: '../src/components/**/*.js',
  ignore: ['**/*.spec.js', '**/spec.js'],
  skipComponentsWithoutExample: true,
  webpackConfig
};
