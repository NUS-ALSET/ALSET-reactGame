'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameStore = function () {
  function GameStore() {
    _classCallCheck(this, GameStore);

    (0, _mobx.extendObservable)(this, {
      characterPosition: [{ x: 100, y: 100 }, { x: 200, y: 200 }],
      characterState: [11, 10],
      timeStamp: [Date.now(), Date.now()],
      stonesData: [],
      timeStampData: Date.now(),
      score: [0, 0],
      mode: 'play',
      config: { speed: 10, minGems: 5, maxGems: 8, gatherToWin: 10 }
    });
  }

  _createClass(GameStore, [{
    key: 'setcharacterPosition',
    value: function setcharacterPosition(position, index) {
      this.characterPosition[index] = position;
    }
  }, {
    key: 'createNewStones',
    value: function createNewStones() {
      var newTimestamp = Date.now();
      if (newTimestamp - this.timeStampData >= 2000) {
        this.timeStampData = Date.now();
        if (this.stonesData.length === 0) {
          var stonesQuant = Math.floor(Math.random() * (this.config.maxGems - this.config.minGems + 1) + this.config.minGems);
          for (var i = 0; i < stonesQuant; i++) {
            var stoneObj = { x: 0, y: 0 };
            stoneObj.x = Math.floor(Math.random() * (8 - 0 + 1) + 0) * 100;
            stoneObj.y = Math.floor(Math.random() * (4 - 0 + 1) + 0) * 100;
            this.stonesData.push(stoneObj);
          }
        }
      }
    }
  }, {
    key: 'checkIfObjectInsideTheScreen',
    value: function checkIfObjectInsideTheScreen(charKey, direction, mode) {
      var el = document.getElementById('character-' + charKey + '-' + mode);
      var parentEl = el.parentElement;
      el = document.getElementById('character-' + charKey + '-' + mode).childNodes[0];
      var parentOffset = parentEl.getBoundingClientRect();
      var viewportOffset = el.getBoundingClientRect();
      var top = viewportOffset.top;
      var left = viewportOffset.left;
      var right = viewportOffset.right;
      var bottom = viewportOffset.bottom;

      var parentTop = parentOffset.top;
      var parentLeft = parentOffset.left;
      var parentRight = parentOffset.right;
      var parentBottom = parentOffset.bottom;
      if (direction === 'left') return left <= parentLeft ? false : true;else if (direction === 'right') return right >= parentRight ? false : true;else if (direction === 'top') return top <= parentTop ? false : true;else if (direction === 'bottom') return bottom >= parentBottom ? false : true;
    }
  }, {
    key: 'rect2Rect',
    value: function rect2Rect(coin, player) {
      return coin.getBoundingClientRect().left <= player.getBoundingClientRect().left + player.getBoundingClientRect().width && coin.getBoundingClientRect().left + coin.getBoundingClientRect().width >= player.getBoundingClientRect().left && coin.getBoundingClientRect().top + coin.getBoundingClientRect().height >= player.getBoundingClientRect().top && coin.getBoundingClientRect().top <= player.getBoundingClientRect().top + player.getBoundingClientRect().height;
    }
  }, {
    key: 'removeHittenGem',
    value: function removeHittenGem(gemId, playerId) {
      this.stonesData.splice(gemId, 1);
      this.score[playerId]++;
    }
  }]);

  return GameStore;
}();

exports.default = new GameStore();