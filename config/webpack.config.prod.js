const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SriPlugin = require('webpack-subresource-integrity')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const paths = require('./paths')

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  entry: { app: paths.app },

  output: {
    crossOriginLoading: 'anonymous',
    filename: '[name].[chunkhash].js',
    path: paths.output,
    publicPath: paths.public
  },

  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', include: paths.source },
      {
        test: /\.svg$/,
        loaders: ['babel-loader', 'react-svg-loader'],
        include: paths.assets
      },
      {
        test: /\.css/,
        loaders: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:5]'
            }
          },
          'postcss-loader'
        ],
        include: paths.source
      },
      { test: /\.(woff|png|jpg|gif)$/, use: 'url-loader?limit=5000' }
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __PRODUCTION__: true
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),

    new SriPlugin({
      hashFuncNames: ['sha384']
    }),

    new HtmlWebpackPlugin({
      title: 'An opinionated boilerplate',
      template: paths.template
    })
  ]
}
