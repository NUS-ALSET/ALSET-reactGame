import React from 'react';
import Games from '../../../build/';
import config from '../../config';

export default class App extends React.Component {
  getPlayersCommands(world, playerNum) {
    try {
      const funName = `player${playerNum}Function`;
      let result = eval(`(${config[funName]}())`);
      return result;
    } catch (err) {
      //console.log(err);
    }
  }
  render() {
    return (
      <div>
        <h1>Hello from component</h1>
        <Games
          game={config.game}
          mode={config.mode}
          player1Function={world => this.getPlayersCommands(world, 1)}
          player2Function={world => this.getPlayersCommands(world, 2)}
        />
      </div>
    );
  }
}
