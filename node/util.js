const { ROWS, COLS, GEM, LEFT, RIGHT, UP, DOWN, EMPTY } = require('./constants');

const getBotDirection = (world, playerPos, gems) => {
  const dirs = [UP, DOWN, LEFT, RIGHT];
  const index = Math.floor(Math.random() * 4);
  return dirs[index];
};
const getRandomValue = (max = ROWS, min = 0) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const clearConsole = () => {
  console.log('\x1Bc');
};
module.exports = { getBotDirection, getRandomValue, clearConsole };
