/* eslint import/no-extraneous-dependencies: warn */
// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('./style.css');
const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const config = {
  entry: {
    'js/main.js': path.resolve(__dirname, 'src/app/index.js'),
  output: {
    path: `${DIST_DIR}/app`,
    filename: 'bundle.js',
    publicPath: '/app/',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: SRC_DIR,
    inline: true,
    watch: true,
    colors: true,
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    preLoaders: [{
      test: /\.js/,
      loader: 'eslint',
      exclude: /node_modules/,
    }],
    loaders: [{
      test: /\.js/,
      include: SRC_DIR,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-2'],
      },
    }, {
      test: /\.sass$/,
      include: SRC_DIR,
      loader: extractCSS.extract([
        // 'style',
        'css?sourceMap',
        'postcss?sourceMap',
        'sass?sourceMap',
      ]),
    }],
  },
  esLint: {
    configFile: './.eslintrc',
    failOnWarning: false,
    failOnError: true,
  },
  sassLoader: {
    incluePaths: ['sass'],
    indentedSyntax: true,
    outputStyle: 'expanded',
  },
  plugins: [
    extractCSS,
  ],
};

module.exports = config;
