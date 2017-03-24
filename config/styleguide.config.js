const paths = require('./paths');
const webpack = require('webpack');
const postcssCssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');

module.exports = {
  title: 'Boilerplate Style Guide',
  rootDir: paths.source,
  components: './src/components/**/*.js',
  skipComponentsWithoutExample: true,

  updateWebpackConfig: config => {
    config.module.loaders.push(
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: paths.source
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
        include: paths.source,
        loader: 'url-loader?limit=5000'
      }
    );

    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
        options: {
          context: __dirname,
          postcss: function(webpack) {
            return [
              postcssImport({
                path: [paths.source, paths.nodeModules]
              }),
              postcssCssNext()
            ];
          }
        }
      })
    );

    return config;
  }
};
