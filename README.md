# Directory Structure

- Src Folder

  All of the package code is here. Hit `yarn package:lint` and `yarn package:build` command after finishing up with coding the package.

- Build Folder

  Build of the Src folder + package.json file and can be deploy to NPMjs from here.

- App Folder

  Testing of the package can be done here. Alset-ReactGame component directly import here from Build folder.
  To start the local dev server Run `yarn start` 





# Installation of Package

```npm i alset-reactgame-test --save```

## How To Use The Package
#### Props :
```javascript
 <ALSET-ReactGame
                game={String}                     // defaults -> Squad
                showCodeEditor={boolean}          // defaults -> false
                mode={String}                     // defaults -> player-vs-bot
                player1Keys = {obj}  // defaults -> {left:'s',right:'f', up:'e', down:'d', action:'w'}
                player2Keys = {obj}  // defaults -> {left:'j',right:'l', up:'i', down:'k', action:'p'}
            />
```
#### Example :
```javascript
import React from 'react';
import AlsetReactGame from 'alset-reactgame-test';

const Game =(props)=>{
    const playerKeys={left:'1',right:'3', up:'5', down:'2', action:'0'}
    return <ALSET-ReactGame
                game='squad'                     
                showCodeEditor={false}          
                mode={'player-vs-bot'}                     
                player1Keys = {playerKeys}
            />
}

export default Game;
```

### Type of games

1.  gemCollector
2.  squadGemCollector
3.  squad
4.  singlePlayerTwoWindows

### Type of modes

1.  player-vs-player
2.  player-vs-bot
3.  bot-vs-bot
4.  bot-vs-custom-code( also send props showCodeEditor={true}) 
