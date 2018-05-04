const { ROWS, COLS, GEM, LEFT, RIGHT, UP, DOWN, EMPTY } = require('./constants');

module.exports = (world, playerPos) => {
  const dirs = [UP, DOWN, LEFT, RIGHT];
  const index = Math.floor(Math.random() * 4);
  return dirs[index];
};
