
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    polyfill: './src/utils/polyfill.js',
    app: './src/index.js',
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, '../', 'dist'),
    publicPath: './'
  },
  resolve: {
    extensions: ['.vue', '.js', '.json'],
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