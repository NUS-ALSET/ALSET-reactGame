import React from 'react';
import AlsetReactGame from '../../modules/ALSET-ReactGame';

const GemCollectorBotVSCustom = () => (
  <div>
    <h1>Gem Collector BOt vs Custom Code </h1>
    <AlsetReactGame game="gemCollector" mode="bot-vs-custom-code" showCodeEditor={true} />
  </div>
);

export default GemCollectorBotVSCustom;
