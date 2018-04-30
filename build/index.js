'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gemCollector = require('./games/gemCollector/');

var _gemCollector2 = _interopRequireDefault(_gemCollector);

var _squadGemCollector = require('./games/squadGemCollector/');

var _squadGemCollector2 = _interopRequireDefault(_squadGemCollector);

var _singlePlayerTwoWindows = require('./games/singlePlayerTwoWindows/');

var _singlePlayerTwoWindows2 = _interopRequireDefault(_singlePlayerTwoWindows);

var _squadGame = require('./games/squadGame/');

var _squadGame2 = _interopRequireDefault(_squadGame);

var _passengerPickup = require('./games/passengerPickup/');

var _passengerPickup2 = _interopRequireDefault(_passengerPickup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlsetReactGame = function AlsetReactGame(props) {
  switch (props.game) {
    case 'gemCollector':
      {
        //'gemCollector'
        return _react2.default.createElement(_gemCollector2.default, props);
      }
    case 'squadGemCollector':
      {
        //'gemCollector'
        return _react2.default.createElement(_squadGemCollector2.default, props);
      }
    case 'singlePlayerTwoWindows':
      {
        return _react2.default.createElement(_singlePlayerTwoWindows2.default, props);
      }
    case 'squadGame':
      {
        return _react2.default.createElement(_squadGame2.default, props);
      }
    case 'passengerPickup':
      {
        return _react2.default.createElement(_passengerPickup2.default, props);
      }
    // create a case here for new game
    default:
      {
        return _react2.default.createElement(_squadGame2.default, props);
      }
  }
};
// All games inside games directory


AlsetReactGame.defaultProps = {
  onPlay: function onPlay() {},
  onPause: function onPause() {},
  onEnd: function onEnd() {},
  onError: function onError() {}
};

exports.default = AlsetReactGame;