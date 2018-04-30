'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

var _gemCollectorConfig = require('../defaultConfig/gemCollectorConfig.json');

var _gemCollectorConfig2 = _interopRequireDefault(_gemCollectorConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gemCollectorStore = function () {
  function gemCollectorStore() {
    _classCallCheck(this, gemCollectorStore);

    (0, _mobx.extendObservable)(this, {
      time: _gemCollectorConfig2.default.time,
      position: [_gemCollectorConfig2.default.game.character1.startingPoint, _gemCollectorConfig2.default.game.character2.startingPoint],
      direction: ['left', 'up'],
      collectives: [],
      timeStampData: Date.now(),
      score: [0, 0],
      mode: 'play',
      func: false,
      funcNeedUpdate: false
    });
  }

  _createClass(gemCollectorStore, [{
    key: 'moveCharacter',
    value: function moveCharacter(characterId) {
      switch (this.direction[characterId]) {
        case 'up':
          this.position[characterId].y -= _gemCollectorConfig2.default['game']['character' + (characterId + 1)].speed;
          break;
        case 'down':
          this.position[characterId].y += _gemCollectorConfig2.default['game']['character' + (characterId + 1)].speed;
          break;
        case 'left':
          this.position[characterId].x -= _gemCollectorConfig2.default['game']['character' + (characterId + 1)].speed;
          break;
        case 'right':
          this.position[characterId].x += _gemCollectorConfig2.default['game']['character' + (characterId + 1)].speed;
          break;
        default:
          break;
      }
    }
  }, {
    key: 'restartCharacter',
    value: function restartCharacter(charId) {
      this.position[charId] = _gemCollectorConfig2.default['game']['character' + (charId + 1)].startingPoint;
      this.direction = ['left', 'up'];
      this.time = _gemCollectorConfig2.default.time;
      this.score = [0, 0];
    }
  }, {
    key: 'changeDirection',
    value: function changeDirection(characterId, direction) {
      this.direction[characterId] = direction;
    }
  }, {
    key: 'generateCollectives',
    value: function generateCollectives(min, max, size) {
      if (!document.getElementById('game0')) return;
      var gameWidth = document.getElementById('game0').childNodes[0].childNodes[0].offsetWidth;
      var gameHeight = document.getElementById('game0').childNodes[0].childNodes[0].offsetHeight;
      if (this.collectives.length > 0) return;
      var stonesQuant = Math.floor(Math.random() * (max - min + 1) + min);
      for (var i = 0; i < stonesQuant; i++) {
        var stoneObj = { x: 0, y: 0 };
        stoneObj.x = Math.floor(Math.random() * (gameWidth / size - 0) + 0) * size;
        stoneObj.y = Math.floor(Math.random() * (gameHeight / size - 0) + 0) * size;
        stoneObj.size = size;
        this.collectives.push(stoneObj);
      }
    }
  }, {
    key: 'removeCollective',
    value: function removeCollective(charId, colId) {
      this.collectives.splice(colId, 1);
      this.score[charId]++;
    }
  }, {
    key: 'updateCustomCode',
    value: function updateCustomCode(newText) {
      this.func = newText;
    }
  }]);

  return gemCollectorStore;
}();

exports.default = new gemCollectorStore();