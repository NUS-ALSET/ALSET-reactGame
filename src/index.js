import React from 'react';
// All games inside games directory
import GemCollector from './games/gemCollector/';
import SinglePlayerTwoWindows from './games/singlePlayerTwoWindows/';
import SquadGame from './games/squadGame/';

const AlsetReactGame = props => {
  switch (props.game) {
    case 'gemCollector': {
      //'gemCollector'
      return <GemCollector {...props} />;
    }
    case 'singlePlayerTwoWindows': {
      return <SinglePlayerTwoWindows {...props} />;
    }
    case 'squadGame': {
      return <SquadGame {...props} />;
    }
    // create a case here for new game
    default: {
      return <SquadGame {...props} />;
    }
  }
};

AlsetReactGame.defaultProps = {
  onPlay: () => {},
  onPause: () => {},
  onEnd: () => {},
  onError: () => {},
};

export default AlsetReactGame;