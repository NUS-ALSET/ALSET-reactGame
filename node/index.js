const cmd = require('node-cmd');
const Promise = require('bluebird');
const { getBotDirection, getRandomValue, clearConsole } = require('./util');

const {
  ROWS,
  COLS,
  SPEED,
  PLAYER_1,
  PLAYER_2,
  GEM,
  BOUNDARY,
  EMPTY,
  PLAYER_1_INDEX,
  PLAYER_2_INDEX,
  LEFT,
  RIGHT,
  UP,
  DOWN,
} = require('./constants');
let { MIN_GEMS, MAX_GEMS, SCORE_TO_WIN, SHOW_GAME } = require('./constants');

const getAsync = Promise.promisify(cmd.get, { multiArgs: false, context: cmd });

const validArgs = ['game', 'config', 'player1', 'player2'];
let _gemsIntoWorld = 0;
let _player1Pos = { row: 0, col: 0 };
let _player2Pos = { row: ROWS - 1, col: COLS - 1 };
let _world = null;
let _scores = [0, 0];

// default players function
let getPlayer1Direction = getBotDirection;
let getPlayer2Direction = getBotDirection;

const initStage = (ROWS = 10, col = 10) => {
  let stage = [];
  for (let r = 0; r < ROWS; r++) {
    let col = [];
    for (let c = 0; c < COLS; c++) {
      col.push(EMPTY);
    }
    stage.push(col);
  }
  return stage;
};

const positionExist = pos => {
  return pos.row < ROWS && pos.col < COLS && pos.row > -1 && pos.col > -1;
};
const playerExist = pos => {
  return _world[pos.row][pos.col] === PLAYER_1 || _world[pos.row][pos.col] === PLAYER_2;
};
const gemExist = ({ row, col }) => {
  return _world[row][col] === GEM;
};
const updateScore = playerIndex => {
  _scores[playerIndex]++;
  _gemsIntoWorld--;
};

const generateGems = () => {
  if (_gemsIntoWorld < MIN_GEMS) {
    let gemsToGenerate = MAX_GEMS - _gemsIntoWorld;
    while (gemsToGenerate) {
      const posR = getRandomValue(ROWS);
      const posC = getRandomValue(COLS);
      if (_world[posR][posC] === EMPTY) {
        _world[posR][posC] = GEM;
        gemsToGenerate--;
      }
    }
    _gemsIntoWorld = MAX_GEMS;
  }
};

const getNextPosition = (playerPos, dir, playerIndex) => {
  const { row, col } = playerPos;
  switch (dir) {
    case LEFT: {
      const pos = { row, col: col - 1 };
      if (positionExist(pos) && gemExist(pos)) {
        updateScore(playerIndex);
      }
      return positionExist(pos) && !playerExist(pos) ? pos : playerPos;
    }
    case RIGHT: {
      const pos = { row, col: col + 1 };
      if (positionExist(pos) && !playerExist(pos) && gemExist(pos)) {
        updateScore(playerIndex);
      }
      return positionExist(pos) && !playerExist(pos) ? pos : playerPos;
    }
    case UP: {
      const pos = { row: row - 1, col };
      if (positionExist(pos) && !playerExist(pos) && gemExist(pos)) {
        updateScore(playerIndex);
      }
      return positionExist(pos) && !playerExist(pos) ? pos : playerPos;
    }
    case DOWN: {
      const pos = { row: row + 1, col };
      if (positionExist(pos) && !playerExist(pos) && gemExist(pos)) {
        updateScore(playerIndex);
      }
      return positionExist(pos) && !playerExist(pos) ? pos : playerPos;
    }
    default: {
      return playerPos;
    }
  }
};

const movePlayer = (position, PLAYER, oldPosition = null) => {
  if (oldPosition) {
    _world[oldPosition.row][oldPosition.col] = EMPTY;
  }
  if (positionExist(position)) {
    _world[position.row][position.col] = PLAYER;
  }
};
const printLeftMargin = () => {
  const margin = process.stdout.columns - (COLS + 2) * 3;
  let str = '';
  for (let m = 0; m < margin / 2; m++) {
    str += ' ';
  }
  return str;
};

const printBoundary = () => {
  let bound = '';
  for (let c = 0; c < COLS * 1 + 1; c++) {
    bound += `${BOUNDARY}  `;
  }
  console.log(printLeftMargin(), bound, '\n');
};
const print = () => {
  printBoundary();
  for (let r = 0; r < _world.length; r++) {
    let str = `${BOUNDARY}`;
    for (let c = 0; c < _world[r].length; c++) {
      str += _world[r][c] + '  ';
    }
    console.log(printLeftMargin(), str.slice(0, -2), `${BOUNDARY}\n`);
  }
  printBoundary();
};
const printGems = num => {
  let gems = '';
  for (let g = 0; g < num; g++) {
    gems += ' ' + GEM;
  }
  return gems;
};
const printScore = () => {
  console.log(`${SHOW_GAME ? printLeftMargin() : ' '} Score To Win: ${SCORE_TO_WIN}\n`);
  console.log(`${SHOW_GAME ? printLeftMargin() : ' '} ${PLAYER_1} Player-1: ${_scores[0]}\n`);
  console.log(`${SHOW_GAME ? printLeftMargin() : ' '} ${PLAYER_2} Player-2: ${_scores[1]}\n`);
};
const startGame = () => {
  const timeInterval = SPEED > 0 ? 1000 / SPEED : 100;
  const intervalID = setInterval(() => {
    if (_scores[PLAYER_1_INDEX] < SCORE_TO_WIN && _scores[PLAYER_2_INDEX] < SCORE_TO_WIN) {
      clearConsole();
      if (SHOW_GAME) print();
      generateGems();
      const player1Direction = getPlayer1Direction(_world, _player1Pos);
      const player2Direction = getPlayer2Direction(_world, _player2Pos);
      const player1NewPos = getNextPosition(_player1Pos, player1Direction, PLAYER_1_INDEX);
      const player2NewPos = getNextPosition(_player2Pos, player2Direction, PLAYER_2_INDEX);
      movePlayer(player1NewPos, PLAYER_1, _player1Pos);
      movePlayer(player2NewPos, PLAYER_2, _player2Pos);
      _player1Pos = player1NewPos;
      _player2Pos = player2NewPos;
      printScore();
    } else {
      clearInterval(intervalID);
      if (_scores[PLAYER_1_INDEX] >= SCORE_TO_WIN) {
        console.log(`\n${SHOW_GAME ? printLeftMargin() : ' '} 🏁 🏁 🏁  ${PLAYER_1} Player-1 Win 🏁 🏁 🏁`);
      } else {
        console.log(`\n${SHOW_GAME ? printLeftMargin() : ' '} 🏁 🏁 🏁  ${PLAYER_2} Player-2 Win 🏁 🏁 🏁`);
      }
      console.log('\n\n');
    }
  }, timeInterval);
};

const initWorld = () => {
  _world = initStage(ROWS, COLS);
  movePlayer(_player1Pos, PLAYER_1);
  movePlayer(_player2Pos, PLAYER_2);
  startGame();
};
const updateConstant = (config = null) => {
  if (config) {
    MAX_GEMS = config.maxGems ? parseInt(config.maxGems) : MAX_GEMS;
    MIN_GEMS = config.minGems ? parseInt(config.minGems) : MIN_GEMS;
    SCORE_TO_WIN = config.scoreToWin ? parseInt(config.scoreToWin) : SCORE_TO_WIN;
    SHOW_GAME = config.showGame ? config.showGame : SHOW_GAME;
  }
};
const checkFiles = async config => {
  try {
    if (config.player1) {
      await getAsync(`ls ${config.player1}`);
      console.log(`${config.player1} file checked ✔`);
      // assign player 1 function
      getPlayer1Direction = require(`./${config.player1}`);
    }
    if (config.player2) {
      await getAsync(`ls ${config.player2}`);
      console.log(`${config.player2} file checked ✔`);
      // assign player 1 function
      getPlayer2Direction = require(`./${config.player2}`);
    }
    if (config.config) {
      await getAsync(`ls ${config.config}`);
      console.log(`${config.config} file checked ✔`);
      updateConstant(require(`./${config.config}`));
    }
  } catch (e) {
    throw e;
  }
};

const init = async () => {
  let config = {};
  const args = process.argv.map(arg => {
    if (arg.includes('=')) {
      const data = arg.split('=');
      if (data.length === 2 && validArgs.includes(data[0])) {
        config[data[0]] = data[1].replace('"', '').replace("'", '');
      }
    }
  });
  await checkFiles(config);
  //start Game
  initWorld();
};
init();
