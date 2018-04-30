'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGameKit = require('react-game-kit');

var _mobxReact = require('mobx-react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

var _character = require('./components/character');

var _character2 = _interopRequireDefault(_character);

var _stone = require('./components/stone');

var _stone2 = _interopRequireDefault(_stone);

var _grass = require('./components/grass');

var _grass2 = _interopRequireDefault(_grass);

var _score = require('./components/score');

var _score2 = _interopRequireDefault(_score);

var _info = require('./components/info');

var _info2 = _interopRequireDefault(_info);

var _controls = require('./components/controls');

var _controls2 = _interopRequireDefault(_controls);

var _winLoseScreen = require('./components/winLoseScreen');

var _winLoseScreen2 = _interopRequireDefault(_winLoseScreen);

var _characterBlonde = require('./assets/character-blonde.png');

var _characterBlonde2 = _interopRequireDefault(_characterBlonde);

var _characterBrunette = require('./assets/character-brunette.png');

var _characterBrunette2 = _interopRequireDefault(_characterBrunette);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// components


//import images


var Game = function (_Component) {
  _inherits(Game, _Component);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this.GameStore = _this.props.store;
    if (props.player1Function) {
      _this.keyListener1 = { status: false };
    } else {
      _this.keyListener1 = new _reactGameKit.KeyListener();
    }
    if (props.player2Function) {
      _this.keyListener2 = { status: false };
    } else {
      _this.keyListener2 = new _reactGameKit.KeyListener();
    }
    _this.updateHandler = _this.updateHandler.bind(_this);
    return _this;
  }

  _createClass(Game, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var player1Keys = this.props.gameConfig.player1Keys;
      if (this.keyListener1 && this.keyListener1.status !== false) {
        this.keyListener1.LEFT = player1Keys.left || _config2.default.player1Keys.left;
        this.keyListener1.RIGHT = player1Keys.right || _config2.default.player1Keys.right;
        this.keyListener1.UP = player1Keys.up || _config2.default.player1Keys.up;
        this.keyListener1.DOWN = player1Keys.down || _config2.default.player1Keys.down;
        this.keyListener1.subscribe([this.keyListener1.LEFT, this.keyListener1.RIGHT, this.keyListener1.UP, this.keyListener1.DOWN]);
      }
      var player2Keys = this.props.gameConfig.player2Keys;
      if (this.keyListener2 && this.keyListener2.status !== false) {
        this.keyListener2.LEFT = player2Keys.left || _config2.default.player2Keys.left;
        this.keyListener2.RIGHT = player2Keys.right || _config2.default.player2Keys.right;
        this.keyListener2.UP = player2Keys.up || _config2.default.player2Keys.up;
        this.keyListener2.DOWN = player2Keys.down || _config2.default.player2Keys.down;
        this.keyListener2.subscribe([this.keyListener2.LEFT, this.keyListener2.RIGHT, this.keyListener2.UP, this.keyListener2.DOWN]);
      }
      this.props.onGameEvent({
        type: 'ready'
      });
      this.GameStore.score = [0, 0];
      this.GameStore.mode = 'play';
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.keyListener1 && this.keyListener1.status !== false) {
        this.keyListener1.unsubscribe();
      }
      if (this.keyListener2 && this.keyListener2.status !== false) {
        this.keyListener2.unsubscribe();
      }
      this.GameStore.score = [0, 0];
      this.GameStore.mode = 'restart';
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var GameStore = this.GameStore;
      var _props = this.props,
          _props$showScore = _props.showScore,
          showScore = _props$showScore === undefined ? true : _props$showScore,
          _props$showMode = _props.showMode,
          showMode = _props$showMode === undefined ? true : _props$showMode,
          _onWin = _props.onWin;


      return _react2.default.createElement(
        'div',
        { className: 'game', style: { height: '60vh', width: '100%' } },
        _react2.default.createElement(
          _reactGameKit.Loop,
          null,
          _react2.default.createElement(
            _reactGameKit.Stage,
            { className: 'index-bg-color' },
            _react2.default.createElement(
              _reactGameKit.World,
              {
                onUpdate: this.updateHandler,
                onInit: this.physicsInit,
                onCollision: this.colissionHandler,
                gravity: {
                  x: 0,
                  y: 0,
                  scale: 0.001
                }
              },
              _react2.default.createElement(_grass2.default, null),
              _react2.default.createElement(_character2.default, {
                key: 'character1',
                keys: this.keyListener1,
                store: GameStore,
                imgSrc: _characterBlonde2.default,
                index: 0,
                mode: this.props.mode
              }),
              _react2.default.createElement(_character2.default, {
                key: 'character2',
                keys: this.keyListener2,
                store: GameStore,
                imgSrc: _characterBrunette2.default,
                index: 1,
                mode: this.props.mode
              }),
              GameStore.stonesData.map(function (stone, index) {
                return _react2.default.createElement(_stone2.default, {
                  key: index,
                  store: GameStore,
                  mode: _this2.props.mode,
                  index: index,
                  onGameEvent: _this2.props.onGameEvent
                });
              }),
              showScore && _react2.default.createElement(_score2.default, { store: GameStore, left: '0', right: 'none', playerId: 0 }),
              showScore && _react2.default.createElement(_score2.default, { store: GameStore, left: 'none', right: '0', playerId: 1 }),
              showMode && _react2.default.createElement(_info2.default, { mode: this.props.mode }),
              _react2.default.createElement(_controls2.default, { store: GameStore, onGameEvent: this.props.onGameEvent }),
              _react2.default.createElement(_winLoseScreen2.default, { store: GameStore, onWin: function onWin(winner) {
                  return _onWin(winner);
                }, onGameEvent: this.props.onGameEvent })
            )
          )
        )
      );
    }
  }, {
    key: 'physicsInit',
    value: function physicsInit(engine) {}
  }, {
    key: 'colissionHandler',
    value: function colissionHandler(engine) {}
  }, {
    key: 'updateHandler',
    value: function updateHandler(engine) {
      var GameStore = this.GameStore;
      var player1Direction = void 0;
      var player2Direction = void 0;
      if (GameStore.mode === 'pause') return;
      var WorldData = {
        players: GameStore.characterPosition,
        stones: GameStore.stonesData
      };
      if (this.props.player1Function) player1Direction = this.props.player1Function(WorldData);
      if (this.props.player2Function) player2Direction = this.props.player2Function(WorldData);
      if (player1Direction) {
        if (player1Direction.left) GameStore.characterState[0] = 9;else if (player1Direction.right) GameStore.characterState[0] = 11;else if (player1Direction.up) GameStore.characterState[0] = 8;else if (player1Direction.down) GameStore.characterState[0] = 10;
      }
      if (player2Direction) {
        if (player2Direction.left) GameStore.characterState[1] = 9;else if (player2Direction.right) GameStore.characterState[1] = 11;else if (player2Direction.up) GameStore.characterState[1] = 8;else if (player2Direction.down) GameStore.characterState[1] = 10;
      }
      GameStore.createNewStones();
    }
  }]);

  return Game;
}(_react.Component);

Game.propTypes = {
  showScore: _propTypes2.default.bool,
  showMode: _propTypes2.default.bool,
  onScoreUpdate: _propTypes2.default.func,
  store: _propTypes2.default.objectOf(Object),
  gameConfig: _propTypes2.default.objectOf(Object)
};

Game.defaultProps = {
  gameConfig: _config2.default,
  onScoreUpdate: function onScoreUpdate() {}
};

exports.default = (0, _mobxReact.observer)(Game);