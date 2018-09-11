const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

module.exports = {
  mode: 'development',

  entry: [paths.app],

  output: {
    filename: '[name].js',
    path: paths.output,
    publicPath: paths.public
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: paths.source
      },
      {
        test: /\.svg$/,
        loaders: ['babel-loader', 'react-svg-loader'],
        include: paths.assets
      },
      {
        test: /\.css/,
        loaders: [
          'style-loader',
          'css-loader?modules&localIdentName=[path][name]--[local]--[hash:base64:5]',
          'postcss-loader'
        ],
        include: paths.source
      },
      {
        test: /\.(woff|png|jpg|gif)$/,
        loader: 'url-loader?limit=5000'
      }
    ]
  },

  devServer: {
    historyApiFallback: true
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      __PRODUCTION__: false
    }),
    new HtmlWebpackPlugin({
      title: 'An opinionated boilerplate',
      template: paths.template
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}
