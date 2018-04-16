import React, { Component } from 'react';

import {
  GemCollectorPlayerVSPlayer,
  GemCollectorBotVSPlayer,
  GemCollectorBotVSBot,
  GemCollectorBotVSCustom,
} from './components/examples';

const App = (props) => {
  let component;
  switch(props.mode) {
    case 'bot-vs-bot':
      component =  (<GemCollectorBotVSBot {...props} />);
      break;
    case 'bot-vs-player':
      component =  ( <GemCollectorBotVSPlayer {...props} />);
      break;
    case 'player-vs-player':
      component =  ( <GemCollectorPlayerVSPlayer {...props} />);
      break;
    case 'bot-vs-custom-code':
      component =  ( <GemCollectorBotVSCustom {...props} />);
      break;
    default :
      component =  ( <GemCollectorBotVSPlayer {...props} />);
      break;
  }
  return component;
};

export default App;
