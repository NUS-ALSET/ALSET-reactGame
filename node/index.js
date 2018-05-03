const getPlayer1Direction = require('./bot1');
const getPlayer2Direction = require('./bot2');
const {
  ROWS,
  COLS,
  MIN_GEMS,
  MAX_GEMS,
  PLAYER_1,
  PLAYER_2,
  PLAYER_1_INDEX,
  PLAYER_2_INDEX,
  GEM,
  SCORE_TO_WIN,
  LEFT,
  RIGHT,
  UP,
  DOWN,
  EMPTY,
} = require('./constants');

let _gemsIntoWorld = 0;
let _player1Pos = { row: 0, col: 0 };
let _player2Pos = { row: ROWS - 1, col: COLS - 1 };
let _world = null;
let _scores = [0, 0];

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

const getRandomValue = (max = ROWS, min = 0) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const postionExist = pos => {
  return pos.row < ROWS && pos.col < COLS && pos.row > -1 && pos.col > -1 && _world[pos.row][pos.col] === EMPTY;
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
      if (postionExist(pos) && gemExist(pos)) {
        updateScore(playerIndex);
      }
      return postionExist(pos) ? pos : playerPos;
    }
    case RIGHT: {
      const pos = { row, col: col + 1 };
      if (postionExist(pos) && gemExist(pos)) {
        updateScore(playerIndex);
      }
      return postionExist(pos) ? pos : playerPos;
    }
    case UP: {
      const pos = { row: row - 1, col };
      if (postionExist(pos) && gemExist(pos)) {
        updateScore(playerIndex);
      }
      return postionExist(pos) ? pos : playerPos;
    }
    case DOWN: {
      const pos = { row: row + 1, col };
      if (postionExist(pos) && gemExist(pos)) {
        updateScore(playerIndex);
      }
      return postionExist(pos) ? pos : playerPos;
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
  if (postionExist(position)) {
    _world[position.row][position.col] = PLAYER;
  }
};

const startGame = () => {
  const intervalID = setInterval(() => {
    if (_scores[PLAYER_1_INDEX] < SCORE_TO_WIN && _scores[PLAYER_2_INDEX] < SCORE_TO_WIN) {
      console.log('\x1Bc');
      console.log(_world);
      console.log('\n');
      generateGems();
      const player1Direction = getPlayer1Direction(_world, _player1Pos);
      const player2Direction = getPlayer2Direction(_world, _player2Pos);
      const player1NewPos = getNextPosition(_player1Pos, player1Direction, PLAYER_1_INDEX);
      const player2NewPos = getNextPosition(_player2Pos, player1Direction, PLAYER_2_INDEX);
      movePlayer(player1NewPos, PLAYER_1, _player1Pos);
      movePlayer(player2NewPos, PLAYER_2, _player2Pos);
      _player1Pos = player1NewPos;
      _player2Pos = player2NewPos;
      console.log(`Player-1: ${_scores[0]}   Player-2: ${_scores[1]}`);
      console.log('\n');
    } else {
      clearInterval(intervalID);
      if (_scores[PLAYER_1_INDEX] >= SCORE_TO_WIN) {
        console.log('\nPlayer 1 Win !!!');
      } else {
        console.log('\nPlayer 2 Win !!!');
      }
    }
  }, 250);

  console.log(_scores);
};
const initWorld = () => {
  _world = initStage(ROWS, COLS);
  movePlayer(_player1Pos, PLAYER_1);
  movePlayer(_player2Pos, PLAYER_2);
  startGame();
};
initWorld();
