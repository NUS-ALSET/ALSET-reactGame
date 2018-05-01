import { observable, computed, extendObservable } from 'mobx';
import squadConfig from '../defaultConfig/passengerPickup.json';

class passengerStore {
  constructor() {
    extendObservable(this, {
      time: squadConfig.time,
      position: [
        [
          squadConfig.game1.character1.startingPoint,
          squadConfig.game1.character2.startingPoint
        ],
        [
          squadConfig.game2.character1.startingPoint,
          squadConfig.game2.character2.startingPoint
        ]
      ],
      direction: [['left', 'up'], ['left', 'up']],
      currentControllable: [1, 1],
      collectives: [[], []],
      timeStampData: Date.now(),
      score: [0, 0],
      mode: 'play',
      func: false,
      funcNeedUpdate: false,
      freePlaces:[[0,0],[0,0]],
      obstacleMap:[new Array(squadConfig.game1.obstacleMap.length), new Array(squadConfig.game1.obstacleMap.length)]
    });
    this.generateMapFromArray(squadConfig.game1.obstacleMap, 0);
    this.generateMapFromArray(squadConfig.game2.obstacleMap, 1);
  }
  generateMapFromArray(arr, gameId){
    //var gameWidth = window.innerWidth/2;
    //var gameHeight = window.innerHeight/2;
    var rowQuantity = window.innerHeight*0.8/30<arr.length?window.innerHeight*0.8/30:arr.length;
    var colQuantity = window.innerWidth/2/30<arr[0].length?window.innerWidth/2/30:arr[0].length;
    
    for(var i=0;i<rowQuantity;i++){
      if(this.obstacleMap[gameId][i]===undefined)
        this.obstacleMap[gameId][i] = new Array(arr[i].length);
      for(var j=0;j<colQuantity;j++){
        if(arr[i][j]){
          this.obstacleMap[gameId][i][j] = new Cell(i,j,gameId);
          //this.obstacleMap[gameId][i][j].tile = document.getElementById("game"+(gameId-1))
          //.querySelectorAll('[style="height: 30px; width: 30px; overflow: hidden; position: absolute; transform: translate('+i*30+'px, '+j*30+'px);"]');
        } else{
          //this.obstacleMap[i][j] = false;
        }
      }
    }
    for(var i=0;i<rowQuantity;i++){
      for(var j=0;j<colQuantity;j++){
        if(this.obstacleMap[gameId][i][j])
          this.obstacleMap[gameId][i][j].addNeighbors(this.obstacleMap[gameId]);
      }
    }
    console.log(this.obstacleMap[gameId]);
  }
  moveCharacter(gameId, characterId) {
    switch (this.direction[gameId][characterId]) {
      case 'up':
        this.position[gameId][characterId].y -=
          squadConfig['game' + (gameId + 1)][
            'character' + (characterId + 1)
          ].speed;
        break;
      case 'down':
        this.position[gameId][characterId].y +=
          squadConfig['game' + (gameId + 1)][
            'character' + (characterId + 1)
          ].speed;
        break;
      case 'left':
        this.position[gameId][characterId].x -=
          squadConfig['game' + (gameId + 1)][
            'character' + (characterId + 1)
          ].speed;
        break;
      case 'right':
        this.position[gameId][characterId].x +=
          squadConfig['game' + (gameId + 1)][
            'character' + (characterId + 1)
          ].speed;
        break;
      default:
        break;
    }
  }
  restartCharacter(gameId, charId) {
    this.position[gameId][charId] =
      squadConfig['game' + (gameId + 1)][
        'character' + (charId + 1)
      ].startingPoint;
    this.direction[gameId] = ['left', 'up'];
    this.time = squadConfig.time;
    this.score = [0, 0];
    this.freePlaces = [[0,0],[0,0]];
  }
  changeDirection(gameId, characterId, direction) {
    this.direction[gameId][characterId] = direction;
  }
  switchPlayer(gameId) {
    if (Date.now() - this.timestamp < 1000) return;
    if (this.currentControllable[gameId] == 0)
      this.currentControllable[gameId] = 1;
    else this.currentControllable[gameId] = 0;
    this.timestamp = Date.now();
  }
  generateCollectives(gameId, min, max, size) {
    if (!document.getElementById('game' + gameId)) return;
      var gameWidth = document.getElementById('game' + gameId).childNodes[0]
        .childNodes[0].offsetWidth;
      var gameHeight = document.getElementById('game' + gameId).childNodes[0]
        .childNodes[0].offsetHeight;
    if (this.collectives[gameId].length > 0) return;
      var stonesQuant = Math.floor(Math.random() * (max - min + 1) + min);
    for (var i = 0; i < stonesQuant; i++) {
      var stoneObj = { x: 0, y: 0 };
      stoneObj.x =
        Math.floor(Math.random() * (gameWidth / size - 0) + 0) * size;
      stoneObj.y =
        Math.floor(Math.random() * (gameHeight / size - 0) + 0) * size;
      stoneObj.size = size;
      if(stoneObj.x>100||stoneObj.y>100){
        this.collectives[0].push(stoneObj);
        this.collectives[1].push(stoneObj);
      }
    }
  }
  loadOutPassengers(gameId, playerId){
    this.score[gameId]+=this.freePlaces[gameId][playerId];
    this.freePlaces[gameId][playerId]=0;
  }
  removeCollective(gameId, playerId, colId) {
    if(this.freePlaces[gameId][playerId]<4){
      this.collectives[gameId].splice(colId, 1);
      this.freePlaces[gameId][playerId]++;
    }
  }
  updateCustomCode(newText) {
    this.func = newText;
  }
}
class Cell{
  constructor(x,y,gameId) {
    this.x=x;
    this.y=y;
    this.gameId=gameId;
    this.f=0;
    this.g=0;
    this.b=0;
    this.neighbors = [];
    this.previous = undefined;
    this.tile=null;
    this.size=30;
    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;
  }
  addNeighbors(grid){
		var x = this.x;
    var y = this.y;
    var rows = grid.length;
    var cols = grid[0].length;
		if(x<cols-1&&grid[x+1]&&grid[x+1][y]){
      this.right = grid[x+1][y];
      this.neighbors.push(grid[x+1][y]);
    }
		if(x>0&&grid[x-1]&&grid[x-1][y]){
      this.left = grid[x-1][y];
      this.neighbors.push(grid[x-1][y]);
    }
		if(y<rows-1&&grid[x]&&grid[x][y+1]){
      this.down = grid[x][y+1];
      this.neighbors.push(grid[x][y+1]);
    }
		if(y>0&&grid[x]&&grid[x][y-1]){
      this.up = grid[x][y-1];
      this.neighbors.push(grid[x][y-1]);
    }
  }
  findHtmlElement(){
    //[style="height: 30px; width: 30px; overflow: hidden; position: absolute; transform: translate(0px, 30px);"]
    this.tile = document.getElementById("game"+(this.gameId))
    .querySelectorAll('[style="height: 30px; width: 30px; overflow: hidden; position: absolute; transform: translate('+this.y*30+'px, '+this.x*30+'px);"]')[0];
    console.log(this.tile);
  }
}
export default new passengerStore();