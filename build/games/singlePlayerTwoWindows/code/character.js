'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactGameKit = require('react-game-kit');

var _Gnome = require('../../../commonComponents/Characters/Gnome1');

var _Gnome2 = _interopRequireDefault(_Gnome);

var _Gnome3 = require('../../../commonComponents/Characters/Gnome2');

var _Gnome4 = _interopRequireDefault(_Gnome3);

var _Blonde = require('../../../commonComponents/Characters/Blonde');

var _Blonde2 = _interopRequireDefault(_Blonde);

var _Brunette = require('../../../commonComponents/Characters/Brunette');

var _Brunette2 = _interopRequireDefault(_Brunette);

var _Drone = require('../../../commonComponents/Characters/Drone1');

var _Drone2 = _interopRequireDefault(_Drone);

var _Drone3 = require('../../../commonComponents/Characters/Drone2');

var _Drone4 = _interopRequireDefault(_Drone3);

var _Drone5 = require('../../../commonComponents/Characters/Drone3');

var _Drone6 = _interopRequireDefault(_Drone5);

var _singlePlayerTwoWindows = require('./store/singlePlayerTwoWindows');

var _singlePlayerTwoWindows2 = _interopRequireDefault(_singlePlayerTwoWindows);

var _index = require('../../../commonFuncs/index');

var _index2 = _interopRequireDefault(_index);

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Character = (_temp = _class = function (_Component) {
  _inherits(Character, _Component);

  function Character(props) {
    _classCallCheck(this, Character);

    var _this = _possibleConstructorReturn(this, (Character.__proto__ || Object.getPrototypeOf(Character)).call(this, props));

    _this.loop = function () {
      if (!document.getElementById('pl' + _this.props.gameId)) return;
      var player = document.getElementById('pl' + _this.props.gameId).childNodes[0];
      var parentEl = document.getElementById('pl' + _this.props.gameId).parentElement;
      var direction = _singlePlayerTwoWindows2.default.direction[_this.props.gameId];
      if (_index2.default.rect2parent(player, parentEl, direction) && _singlePlayerTwoWindows2.default.mode == 'play') {
        _singlePlayerTwoWindows2.default.moveCharacter(_this.props.gameId);
      }
      _this.getCollectives();
      if (_singlePlayerTwoWindows2.default.mode == 'restart') {
        _singlePlayerTwoWindows2.default.restartCharacter(_this.props.gameId);
      }
    };

    _this.loop = _this.loop.bind(_this);
    _this.getCollectives = _this.getCollectives.bind(_this);
    _this.keyListener = new _reactGameKit.KeyListener();
    document.addEventListener('keydown', function (e) {
      if (_singlePlayerTwoWindows2.default.mode == 'play') {
        switch (e.key) {
          case _this.props.keys.left:
            _singlePlayerTwoWindows2.default.changeDirection(_this.props.gameId, 'left');
            break;
          case _this.props.keys.right:
            _singlePlayerTwoWindows2.default.changeDirection(_this.props.gameId, 'right');
            break;
          case _this.props.keys.up:
            _singlePlayerTwoWindows2.default.changeDirection(_this.props.gameId, 'up');
            break;
          case _this.props.keys.down:
            _singlePlayerTwoWindows2.default.changeDirection(_this.props.gameId, 'down');
            break;
          default:
            break;
        }
      }
    });
    return _this;
  }

  _createClass(Character, [{
    key: 'getCollectives',
    value: function getCollectives() {
      var _this2 = this;

      var player = document.getElementById('pl' + this.props.gameId);
      var parentEl = player.parentElement;
      player = player.childNodes[0];
      var collectives = parentEl.getElementsByClassName('collective');
      Array.from(collectives).forEach(function (collective) {
        if (_index2.default.rect2Rect(collective, player)) {
          var collectiveId = collective.getAttribute('data-key');
          _singlePlayerTwoWindows2.default.removeCollective(_this2.props.gameId, collectiveId);
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loopID = this.context.loop.subscribe(this.loop);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.loop.unsubscribe(this.loopID);
    }
  }, {
    key: 'render',
    value: function render() {
      switch (this.props.type) {
        case 'gnome1':
          return _react2.default.createElement(
            'div',
            { id: 'pl' + this.props.gameId },
            _react2.default.createElement(_Gnome2.default, {
              position: _singlePlayerTwoWindows2.default.position[this.props.gameId],
              direction: _singlePlayerTwoWindows2.default.direction[this.props.gameId]
            })
          );
        case 'gnome2':
          return _react2.default.createElement(
            'div',
            { id: 'pl' + this.props.gameId },
            _react2.default.createElement(_Gnome4.default, {
              position: _singlePlayerTwoWindows2.default.position[this.props.gameId],
              direction: _singlePlayerTwoWindows2.default.direction[this.props.gameId]
            })
          );
        case 'blonde':
          return _react2.default.createElement(
            'div',
            { id: 'pl' + this.props.gameId },
            _react2.default.createElement(_Blonde2.default, {
              position: _singlePlayerTwoWindows2.default.position[this.props.gameId],
              direction: _singlePlayerTwoWindows2.default.direction[this.props.gameId]
            })
          );
        case 'brunette':
          return _react2.default.createElement(
            'div',
            { id: 'pl' + this.props.gameId },
            _react2.default.createElement(_Brunette2.default, {
              position: _singlePlayerTwoWindows2.default.position[this.props.gameId],
              direction: _singlePlayerTwoWindows2.default.direction[this.props.gameId]
            })
          );
        case 'drone1':
          return _react2.default.createElement(
            'div',
            { id: 'pl' + this.props.gameId },
            _react2.default.createElement(_Drone2.default, {
              position: _singlePlayerTwoWindows2.default.position[this.props.gameId],
              direction: _singlePlayerTwoWindows2.default.direction[this.props.gameId]
            })
          );
        case 'drone2':
          return _react2.default.createElement(
            'div',
            { id: 'pl' + this.props.gameId },
            _react2.default.createElement(_Drone4.default, {
              position: _singlePlayerTwoWindows2.default.position[this.props.gameId],
              direction: _singlePlayerTwoWindows2.default.direction[this.props.gameId]
            })
          );
        case 'drone3':
          return _react2.default.createElement(
            'div',
            { id: 'pl' + this.props.gameId },
            _react2.default.createElement(_Drone6.default, {
              position: _singlePlayerTwoWindows2.default.position[this.props.gameId],
              direction: _singlePlayerTwoWindows2.default.direction[this.props.gameId]
            })
          );
        default:
          return _react2.default.createElement(
            'div',
            { id: 'pl' + this.props.gameId },
            _react2.default.createElement(_Gnome2.default, {
              position: _singlePlayerTwoWindows2.default.position[this.props.gameId],
              direction: _singlePlayerTwoWindows2.default.direction[this.props.gameId]
            })
          );
      }
    }
  }]);

  return Character;
}(_react.Component), _class.contextTypes = {
  loop: _propTypes2.default.object,
  scale: _propTypes2.default.number
}, _temp);
exports.default = (0, _mobxReact.observer)(Character);