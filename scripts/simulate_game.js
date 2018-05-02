const fs = require('fs');
const cmd = require('node-cmd');

const configFilePath = '../app/config.json';
const validArgs = ['game', 'mode', 'player1', 'player2'];

const startProject = () => {
  const processRef = cmd.run(`
  cd ..
  yarn start
  `);
  processRef.stdout.on('data', data => {
    console.log(data);
  });
};

const writeConfig = config => {
  const configString = JSON.stringify(config, null, '\t');
  fs.writeFile(configFilePath, configString, err => {
    if (err) {
      throw err;
    }
    startProject();
  });
};

const checkBotFiles = config => {
  if (config.player1) {
    cmd.get(`ls ${config.player1}`, (err, data, stderr) => {
      if (err) {
        throw err;
      }
      console.log(`${config.player1} file checked ✔`);
      const f = require(`./${config.player1}`);
      config.player1Function = '' + f;
      if (config.player2) {
        cmd.get(`ls ${config.player2}`, (err, data, stderr) => {
          if (err) {
            throw err;
          }
          console.log(`${config.player2} file checked ✔`);
          const f = require(`./${config.player2}`);
          config.player2Function = '' + f;

          delete config.player1;
          delete config.player2;
          writeConfig(config);
        });
      }
    });
  }
};

const init = () => {
  let config = {
    mode: 'bot-vs-bot',
  };
  const args = process.argv.map(arg => {
    if (arg.includes('=')) {
      const data = arg.split('=');
      if (data.length === 2 && validArgs.includes(data[0])) {
        config[data[0]] = data[1].replace('"', '').replace('\'', '');
      }
    }
  });
  checkBotFiles(config);
};

//init script
init();

//start command
// node simulate_game.js game=squad mode=bot-vs-bot player1=bot1.js player2=bot2.js
