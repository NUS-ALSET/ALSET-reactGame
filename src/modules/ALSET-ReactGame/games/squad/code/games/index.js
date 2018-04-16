import React, {Component} from 'react';
import { observer } from 'mobx-react';
import Util from '../utils/index';
import Squad from './squad/index';
import GemCollector from './gemCollector/index';
import SquadGame from './squadGame/index';
import SinglePlayerTwoWindows from './singlePlayerTwoWindows';

import SinglePlayerTwoWindowsConfig from '../defaultConfigs/singlePlayerTwoWindowsConfig.json';
import SquadGameConfig from '../defaultConfigs/squadGameConfig.json';
import GemCollectorConfig from '../defaultConfigs/gemCollectorConfig.json';
import SquadDefaultConfig from '../defaultConfigs/squadConfig.json';
import CodeEditor from '../games/squadGame/code-editor';
import config from '../../../../../../config.json';

class ALSETReactGame extends Component{
    constructor(props){
        super(props);
        this.getGameData = this.getGameData.bind(this);
    }
    render() {
        const {selectedGameMode} = this.props;
        var gameData = this.getGameData(selectedGameMode.name);
        var getCommands = Util.getCommands;
        switch(selectedGameMode.id){
            case 0:
                return <Squad
                onPlay={this.props.onPlay}
                onPause={this.props.onPause}
                onEnd={this.props.onEnd}
                onError={this.props.onError}
                onStateChange={this.props.onStateChange}
                player1Function={this.props.player1Function}
                player2Function={this.props.player2Function}
                gameData={gameData}
                showCodeEditor= {false} 
                getCommands={getCommands}
                onGameEvent={this.props.onGameEvent}
                />;
                case 1:
                return <GemCollector
                gameData={gameData}
                getCommands={getCommands}
                onGameEvent={this.props.onGameEvent}
                />;
                case 2:
                return <SinglePlayerTwoWindows
                gameData={gameData}
                getCommands={getCommands}
                onGameEvent={this.props.onGameEvent}
                />;
                case 3:
                return <SquadGame
                gameData={gameData}
                getCommands={getCommands}
                onGameEvent={this.props.onGameEvent}
                />;
            default:
                return (
                <div>
                <Squad
                    onPlay={this.props.onPlay}
                    onPause={this.props.onPause}
                    onEnd={this.props.onEnd}
                    onError={this.props.onError}
                    onStateChange={this.props.onStateChange}
                    player1Function={this.props.player1Function}
                    player2Function={this.props.player2Function}
                    gameData={gameData}
                    getCommands={getCommands}
                    onGameEvent={this.props.onGameEvent}
                />
                <CodeEditor/>
                </div>
                );
        }
    }
    getGameData(gameType){
        var data = {};
        if(gameType=='Gem Collector'){
        var defaultConfig = GemCollectorConfig;
        }
        else if(gameType=='Single Player Two Windows')
        var defaultConfig = SinglePlayerTwoWindowsConfig;
        else if(gameType=='Squad Game')
        var defaultConfig = SquadGameConfig;
        else
        var defaultConfig = SquadDefaultConfig;
        var customConfig =this.props.config?this.props.config:{};
        data.showCodeEditor = this.props.showCodeEditor||customConfig.showCodeEditor||defaultConfig.showCodeEditor;
        data.config = this.props.config||defaultConfig;
        data.player = this.props.player||customConfig.player||defaultConfig.player;
        data.mode = this.props.mode||customConfig.mode||defaultConfig.mode;
        data.player1Keys = this.props.gameConfig.player1Keys||customConfig.player1Keys;
        data.player2Keys = this.props.gameConfig.player2Keys||customConfig.player2Keys;
        return data;
    }
}
export default observer(ALSETReactGame);