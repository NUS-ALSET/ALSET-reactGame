'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGameKit = require('react-game-kit');

var _tile = require('./tile');

var _tile2 = _interopRequireDefault(_tile);

var _character = require('./character');

var _character2 = _interopRequireDefault(_character);

var _bot = require('./bot');

var _bot2 = _interopRequireDefault(_bot);

var _collectives = require('./collectives');

var _collectives2 = _interopRequireDefault(_collectives);

var _obstacle = require('./obstacle');

var _obstacle2 = _interopRequireDefault(_obstacle);

var _controls = require('./controls');

var _controls2 = _interopRequireDefault(_controls);

var _codeEditor = require('./code-editor');

var _codeEditor2 = _interopRequireDefault(_codeEditor);

var _singlePlayerTwoWindows = require('./store/singlePlayerTwoWindows');

var _singlePlayerTwoWindows2 = _interopRequireDefault(_singlePlayerTwoWindows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PassengerPickUp = function (_Component) {
  _inherits(PassengerPickUp, _Component);

  function PassengerPickUp() {
    _classCallCheck(this, PassengerPickUp);

    return _possibleConstructorReturn(this, (PassengerPickUp.__proto__ || Object.getPrototypeOf(PassengerPickUp)).apply(this, arguments));
  }

  _createClass(PassengerPickUp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //console.log(document.getElementById('codeEditor').value);
      if (document.getElementById('codeEditor')) _singlePlayerTwoWindows2.default.func = document.getElementById('codeEditor').value;
    }
  }, {
    key: 'getWrapperStyles',
    value: function getWrapperStyles() {
      return {
        height: '95vh',
        width: '100%',
        transform: 'translate(0px, 0px) translateZ(0)',
        transformOrigin: 'top left'
      };
    }
  }, {
    key: 'getGameWrapperStyles',
    value: function getGameWrapperStyles() {
      return {
        height: '100%',
        width: '50%',
        float: 'left',
        transform: 'translate(0px, 0px) translateZ(0)',
        transformOrigin: 'top left'
      };
    }
  }, {
    key: 'getGameStyles',
    value: function getGameStyles() {
      return {
        height: '80%',
        width: '100%',
        float: 'left',
        transform: 'translate(0px, 10%) translateZ(0)',
        transformOrigin: 'top left',
        background: '#3a9bdc'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(this.props.gameData);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: this.getWrapperStyles() },
          _react2.default.createElement(
            _reactGameKit.Loop,
            null,
            _react2.default.createElement(_controls2.default, {
              onPlay: this.props.onPlay,
              onPause: this.props.onPause,
              onEnd: this.props.onEnd

            }),
            _react2.default.createElement(
              'div',
              { id: 'game0', style: this.getGameWrapperStyles() },
              _react2.default.createElement(
                _reactGameKit.Stage,
                { style: this.getGameStyles() },
                _react2.default.createElement(_tile2.default, { tiles: this.props.gameData.config.game1.tiles }),
                _react2.default.createElement(
                  'div',
                  null,
                  this.props.gameData.config.game1.obstacles.map(function (obstacle, index) {
                    return _react2.default.createElement(_obstacle2.default, { key: index, obstacle: obstacle, index: index });
                  })
                ),
                _react2.default.createElement(_collectives2.default, {
                  type: this.props.gameData.config.game1.collectives.type,
                  size: this.props.gameData.config.game1.collectives.size,
                  min: this.props.gameData.config.game1.collectives.min,
                  max: this.props.gameData.config.game1.collectives.max,
                  gameId: 0
                }),
                (this.props.gameData.player == 'player1' && this.props.gameData.mode == 'player-vs-bot' || this.props.gameData.mode == 'player-vs-player') && _react2.default.createElement(_character2.default, {
                  gameId: 0,
                  type: this.props.gameData.config.game1.character.type,
                  keys: this.props.gameData.player1Keys

                }),
                (this.props.gameData.player == 'player2' && this.props.gameData.mode == 'player-vs-bot' || this.props.gameData.mode == 'bot-vs-bot') && _react2.default.createElement(_bot2.default, {
                  gameId: 0,
                  type: this.props.gameData.config.game1.character.type,
                  getCommands: this.props.getCommands,
                  showCodeEditor: this.props.gameData.showCodeEditor,
                  player1Function: this.props.player1Function,
                  onError: this.props.onError

                })
              )
            ),
            _react2.default.createElement(
              'div',
              { id: 'game1', style: this.getGameWrapperStyles() },
              _react2.default.createElement(
                _reactGameKit.Stage,
                { style: this.getGameStyles() },
                _react2.default.createElement(_tile2.default, { tiles: this.props.gameData.config.game2.tiles }),
                _react2.default.createElement(
                  'div',
                  null,
                  this.props.gameData.config.game2.obstacles.map(function (obstacle, index) {
                    return _react2.default.createElement(_obstacle2.default, { key: index, obstacle: obstacle, index: index });
                  })
                ),
                _react2.default.createElement(_collectives2.default, {
                  type: this.props.gameData.config.game2.collectives.type,
                  size: this.props.gameData.config.game2.collectives.size,
                  min: this.props.gameData.config.game2.collectives.min,
                  max: this.props.gameData.config.game2.collectives.max,
                  gameId: 1
                }),
                (this.props.gameData.player == 'player2' && this.props.gameData.mode == 'player-vs-bot' || this.props.gameData.mode == 'player-vs-player') && _react2.default.createElement(_character2.default, {
                  gameId: 1,
                  charId: 0,
                  type: this.props.gameData.config.game2.character.type,
                  keys: this.props.gameData.player2Keys

                }),
                (this.props.gameData.player == 'player1' && this.props.gameData.mode == 'player-vs-bot' || this.props.gameData.mode == 'bot-vs-bot') && _react2.default.createElement(_bot2.default, {
                  gameId: 1,
                  charId: 0,
                  type: this.props.gameData.config.game2.character.type,
                  getCommands: this.props.getCommands,
                  showCodeEditor: this.props.gameData.showCodeEditor,
                  player2Function: this.props.player2Function,
                  onError: this.props.onError

                })
              )
            )
          )
        ),
        this.props.gameData.showCodeEditor ? _react2.default.createElement(_codeEditor2.default, null) : ''
      );
    }
  }]);

  return PassengerPickUp;
}(_react.Component);

exports.default = PassengerPickUp;