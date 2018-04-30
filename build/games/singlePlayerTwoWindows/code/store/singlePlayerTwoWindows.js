'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

var _singlePlayerTwoWindowsConfig = require('../defaultConfig/singlePlayerTwoWindowsConfig.json');

var _singlePlayerTwoWindowsConfig2 = _interopRequireDefault(_singlePlayerTwoWindowsConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var singlePlayerTwoWindowsStore = function () {
  function singlePlayerTwoWindowsStore() {
    _classCallCheck(this, singlePlayerTwoWindowsStore);

    (0, _mobx.extendObservable)(this, {
      time: _singlePlayerTwoWindowsConfig2.default.time,
      position: [_singlePlayerTwoWindowsConfig2.default.game1.character.startingPoint, _singlePlayerTwoWindowsConfig2.default.game2.character.startingPoint],
      direction: ['left', 'up'],
      collectives: [[], []],
      timeStampData: Date.now(),
      score: [0, 0],
      mode: 'play',
      func: false,
      funcNeedUpdate: false
    });
  }

  _createClass(singlePlayerTwoWindowsStore, [{
    key: 'moveCharacter',
    value: function moveCharacter(gameId) {
      switch (this.direction[gameId]) {
        case 'up':
          this.position[gameId].y -= _singlePlayerTwoWindowsConfig2.default['game' + (gameId + 1)]['character'].speed;
          break;
        case 'down':
          this.position[gameId].y += _singlePlayerTwoWindowsConfig2.default['game' + (gameId + 1)]['character'].speed;
          break;
        case 'left':
          this.position[gameId].x -= _singlePlayerTwoWindowsConfig2.default['game' + (gameId + 1)]['character'].speed;
          break;
        case 'right':
          this.position[gameId].x += _singlePlayerTwoWindowsConfig2.default['game' + (gameId + 1)]['character'].speed;
          break;
        default:
          break;
      }
    }
  }, {
    key: 'restartCharacter',
    value: function restartCharacter(gameId) {
      this.position[gameId] = _singlePlayerTwoWindowsConfig2.default['game' + (gameId + 1)]['character'].startingPoint;
      this.direction = ['left', 'up'];
      this.time = _singlePlayerTwoWindowsConfig2.default.time;
      this.score = [0, 0];
    }
  }, {
    key: 'changeDirection',
    value: function changeDirection(gameId, direction) {
      this.direction[gameId] = direction;
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
        this.collectives[0].push(stoneObj);
        this.collectives[1].push(stoneObj);
      }
    }
  }, {
    key: 'removeCollective',
    value: function removeCollective(gameId, colId) {
      this.collectives[gameId].splice(colId, 1);
      this.score[gameId]++;
    }
  }, {
    key: 'updateCustomCode',
    value: function updateCustomCode(newText) {
      this.func = newText;
    }
  }]);

  return singlePlayerTwoWindowsStore;
}();

exports.default = new singlePlayerTwoWindowsStore();