/* eslint import/no-extraneous-dependencies: warn */
// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const extractSass = new ExtractTextPlugin('./css/style.css');
const extractHTML = new ExtractTextPlugin('./index.html');

const config = {
  entry: {
    'index.html': path.resolve(__dirname, 'src/templates/index.pug'),
    'js/main.js': path.resolve(__dirname, 'src/app/index.js'),
    'css/style.css': path.resolve(__dirname, 'src/sass/style.sass'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
    // publicPath: '/app/',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    inline: true,
    // port: 3000,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: {
        loader: 'eslint-loader',
        options: {
          configFile: './.eslintrc.json',
          failOnWarning: false,
          failOnError: true,
        },
      },
    }, {
      test: /\.js$/,
      include: path.resolve(__dirname, 'src/app'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-2'],
        },
      },
    }, {
      test: /\.sass$/,
      include: path.resolve(__dirname, 'src/sass'),
      use: extractSass.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: () => [autoprefixer],
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            incluePaths: ['sass'],
            indentedSyntax: true,
            outputStyle: 'expanded',
          },
        }],
      }),
    }, {
      test: /\.pug$/,
      include: path.resolve(__dirname, 'src/templates'),
      use: extractHTML.extract({
        use: [{
          loader: 'pug-html-loader',
          options: {
            pretty: true,
          },
        }],
      }),
    }],
  },
  plugins: [
    extractHTML,
    extractSass,
  ],
};

module.exports = config;
