'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ALSETReactGame = require('../../modules/ALSET-ReactGame');

var _ALSETReactGame2 = _interopRequireDefault(_ALSETReactGame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GemCollectorBotVSPlayer = function GemCollectorBotVSPlayer() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h1',
      null,
      'Gem Collector Bot vs Player '
    ),
    _react2.default.createElement(_ALSETReactGame2.default, { game: 'gemCollector', mode: 'player-vs-bot' })
  );
};

exports.default = GemCollectorBotVSPlayer;