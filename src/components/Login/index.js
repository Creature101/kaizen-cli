const path = require('path');
const fsx = require('fs-extra');
const prompt = require('prompt');
const Log = require('../../lib/Log');
const Spinner = require('../../lib/Spinner');
const { apiLogin } = require('../../lib/apis');

function builder(yargs) {
  return yargs
    .example('kaizen login');
}

async function handler(argv) {
  try {
    const { email, password } = await inputEmailAndPassword();
    
    Spinner.start();

    try {
      const response = await apiLogin(email, password);
      const {
        accessToken,
        refreshToken,
        idToken,
        expiresIn,
        name
      } = response.data;
      
      Spinner.stop();
      fsx.writeJsonSync(path.resolve(__dirname, '../../../.kaizenrc'), {
        accessToken,
        refreshToken,
        idToken,
        expiresIn,
        name,
        loginOn: new Date()
      });
      Log.SuccessLog(`Welcome ${name}`);
    } catch (loginError) {
      console.error(loginError.response.data.message);
    }

  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

function inputEmailAndPassword() {
  const promptSchema = {
    properties: {
      email: {
        pattern: /^[a-zA-Z0-9_]+@[a-zA-Z0-9_.]+$/
      },
      password: {
        hidden: true
      }
    }
  };

  return new Promise(function (resolve, reject) {
    prompt.start();
    prompt.get(promptSchema, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  });

}

module.exports = function (yargs) {
  const command = 'login';
  const commandDescription = 'To log in KAIZEN manager';
  yargs.command(command, commandDescription, builder, handler);
}