
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');

const { resolve } = utils;

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    polyfill: './src/utils/polyfill.js',
    app: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    publicPath: '/'
  },
  resolve: {
    alias:{
      'vue$':'vue/dist/vue.esm.js',
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};