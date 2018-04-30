'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

var _passengerPickup = require('../defaultConfig/passengerPickup.json');

var _passengerPickup2 = _interopRequireDefault(_passengerPickup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var squadStore = function () {
  function squadStore() {
    _classCallCheck(this, squadStore);

    (0, _mobx.extendObservable)(this, {
      time: _passengerPickup2.default.time,
      position: [[_passengerPickup2.default.game1.character1.startingPoint, _passengerPickup2.default.game1.character2.startingPoint], [_passengerPickup2.default.game2.character1.startingPoint, _passengerPickup2.default.game2.character2.startingPoint]],
      direction: [['left', 'up'], ['left', 'up']],
      currentControllable: [1, 1],
      collectives: [[], []],
      timeStampData: Date.now(),
      score: [0, 0],
      mode: 'play',
      func: false,
      funcNeedUpdate: false,
      freePlaces: [[0, 0], [0, 0]]
    });
  }

  _createClass(squadStore, [{
    key: 'moveCharacter',
    value: function moveCharacter(gameId, characterId) {
      switch (this.direction[gameId][characterId]) {
        case 'up':
          this.position[gameId][characterId].y -= _passengerPickup2.default['game' + (gameId + 1)]['character' + (characterId + 1)].speed;
          break;
        case 'down':
          this.position[gameId][characterId].y += _passengerPickup2.default['game' + (gameId + 1)]['character' + (characterId + 1)].speed;
          break;
        case 'left':
          this.position[gameId][characterId].x -= _passengerPickup2.default['game' + (gameId + 1)]['character' + (characterId + 1)].speed;
          break;
        case 'right':
          this.position[gameId][characterId].x += _passengerPickup2.default['game' + (gameId + 1)]['character' + (characterId + 1)].speed;
          break;
        default:
          break;
      }
    }
  }, {
    key: 'restartCharacter',
    value: function restartCharacter(gameId, charId) {
      this.position[gameId][charId] = _passengerPickup2.default['game' + (gameId + 1)]['character' + (charId + 1)].startingPoint;
      this.direction[gameId] = ['left', 'up'];
      this.time = _passengerPickup2.default.time;
      this.score = [0, 0];
      this.freePlaces = [[0, 0], [0, 0]];
    }
  }, {
    key: 'changeDirection',
    value: function changeDirection(gameId, characterId, direction) {
      this.direction[gameId][characterId] = direction;
    }
  }, {
    key: 'switchPlayer',
    value: function switchPlayer(gameId) {
      if (Date.now() - this.timestamp < 1000) return;
      if (this.currentControllable[gameId] == 0) this.currentControllable[gameId] = 1;else this.currentControllable[gameId] = 0;
      this.timestamp = Date.now();
    }
  }, {
    key: 'generateCollectives',
    value: function generateCollectives(gameId, min, max, size) {
      if (!document.getElementById('game' + gameId)) return;
      var gameWidth = document.getElementById('game' + gameId).childNodes[0].childNodes[0].offsetWidth;
      var gameHeight = document.getElementById('game' + gameId).childNodes[0].childNodes[0].offsetHeight;
      if (this.collectives[gameId].length > 0) return;
      var stonesQuant = Math.floor(Math.random() * (max - min + 1) + min);
      for (var i = 0; i < stonesQuant; i++) {
        var stoneObj = { x: 0, y: 0 };
        stoneObj.x = Math.floor(Math.random() * (gameWidth / size - 0) + 0) * size;
        stoneObj.y = Math.floor(Math.random() * (gameHeight / size - 0) + 0) * size;
        stoneObj.size = size;
        if (stoneObj.x > 100 || stoneObj.y > 100) {
          this.collectives[0].push(stoneObj);
          this.collectives[1].push(stoneObj);
        }
      }
    }
  }, {
    key: 'loadOutPassengers',
    value: function loadOutPassengers(gameId, playerId) {
      this.score[gameId] += this.freePlaces[gameId][playerId];
      this.freePlaces[gameId][playerId] = 0;
    }
  }, {
    key: 'removeCollective',
    value: function removeCollective(gameId, playerId, colId) {
      if (this.freePlaces[gameId][playerId] < 4) {
        this.collectives[gameId].splice(colId, 1);
        this.freePlaces[gameId][playerId]++;
      }
    }
  }, {
    key: 'updateCustomCode',
    value: function updateCustomCode(newText) {
      this.func = newText;
    }
  }]);

  return squadStore;
}();

exports.default = new squadStore();