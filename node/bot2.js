const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const DOWN = 'down';

const getDirection = (world, playerPos) => {
  const dirs = [LEFT, RIGHT, UP, DOWN];
  const index = Math.floor(Math.random() * 4);
  return dirs[index];
};

module.exports = getDirection;
