
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const portfinder = require('portfinder');
const execSync = require('child_process').execSync;
const packageConfig = require('../package.json');
const clearConsole = require('./clearConsole');
const getProcessForPort = require('./getProcessForPort');

exports.resolve = (dirPath) => path.resolve(__dirname, '../', dirPath);

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.choosePort = (defaultPort) => new Promise((resolve, reject) => {
  portfinder.basePort = defaultPort;
  portfinder.getPort(function (err, port) {
    if (err) {
      return reject(err);
    }

    if (port === defaultPort) {
      return resolve(port);
    }

    clearConsole();

    const message =
      process.platform !== 'win32' && defaultPort < 1024 && !isRoot()
        ? `Admin permissions are required to run a server on a port below 1024.`
        : `Something is already running on port ${defaultPort}.`;

    const existingProcess = getProcessForPort(defaultPort);

    const question = {
      type: 'confirm',
      name: 'shouldChangePort',
      message:
        chalk.yellow(
          message +
            `${existingProcess ? ` Probably:\n  ${existingProcess}` : ''}`
        ) + '\n\nWould you like to run the app on another port instead?',
      default: true,
    };
    
    inquirer.prompt(question).then(answer => {
      if (answer.shouldChangePort) {
        resolve(port);
      } else {
        reject(null);
      }
    });
  })
})