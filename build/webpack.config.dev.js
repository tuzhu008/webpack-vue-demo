const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const webpack = require('webpack');
const utils = require('./utils');
const portfinder = require('portfinder');
const inquirer = require('inquirer');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const { resolve } = utils;

const devWebpackConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'warning',
    contentBase: resolve('dist'),
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    quiet: true,
    host: 'localhost',
  },
  plugins: [
  ]
});

module.exports = () => {
  return new Promise((resolve, reject) => {
    // portfinder.basePort = process.env.PORT || config.dev.port;

    utils.choosePort(3000).then((port) => {
      process.env.PORT = port;
      devWebpackConfig.devServer.port = port;

      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: true
        ? utils.createNotifierCallback()
        : undefined
      }));

      resolve(devWebpackConfig);
    }, (err) => {
      reject(err);
    });
  });
}