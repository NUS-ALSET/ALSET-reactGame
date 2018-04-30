'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../../commonFuncs/index');

var _index2 = _interopRequireDefault(_index);

var _singlePlayerTwoWindowsConfig = require('./code/defaultConfig/singlePlayerTwoWindowsConfig.json');

var _singlePlayerTwoWindowsConfig2 = _interopRequireDefault(_singlePlayerTwoWindowsConfig);

var _code = require('./code/');

var _code2 = _interopRequireDefault(_code);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ALSETReactGame = function (_Component) {
    _inherits(ALSETReactGame, _Component);

    function ALSETReactGame(props) {
        _classCallCheck(this, ALSETReactGame);

        var _this = _possibleConstructorReturn(this, (ALSETReactGame.__proto__ || Object.getPrototypeOf(ALSETReactGame)).call(this, props));

        _this.getGameData = _this.getGameData.bind(_this);
        return _this;
    }

    _createClass(ALSETReactGame, [{
        key: 'render',
        value: function render() {
            var gameData = this.getGameData(this.props.game);
            var getCommands = _index2.default.getCommands;
            return _react2.default.createElement(_code2.default, {
                onPlay: this.props.onPlay,
                onPause: this.props.onPause,
                onEnd: this.props.onEnd,
                onError: this.props.onError,
                onStateChange: this.props.onStateChange,
                player1Function: this.props.player1Function,
                player2Function: this.props.player2Function,
                gameData: gameData,
                getCommands: getCommands
            });
        }
    }, {
        key: 'getGameData',
        value: function getGameData(gameType) {
            var data = {};
            var defaultConfig = _singlePlayerTwoWindowsConfig2.default;
            var customConfig = this.props.config ? this.props.config : {};
            data.showCodeEditor = this.props.showCodeEditor || customConfig.showCodeEditor || defaultConfig.showCodeEditor;
            data.config = this.props.config || defaultConfig;
            data.player = this.props.player || customConfig.player || defaultConfig.player;
            data.mode = this.props.mode || customConfig.mode || defaultConfig.mode;
            data.player1Keys = this.props.player1Keys || customConfig.player1Keys || defaultConfig.player1Keys;
            data.player2Keys = this.props.player2Keys || customConfig.player2Keys || defaultConfig.player2Keys;
            return data;
        }
    }]);

    return ALSETReactGame;
}(_react.Component);

exports.default = ALSETReactGame;