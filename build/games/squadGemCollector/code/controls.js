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

var _gemCollector = require('./store/gemCollector');

var _gemCollector2 = _interopRequireDefault(_gemCollector);

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controls = (_temp = _class = function (_Component) {
  _inherits(Controls, _Component);

  function Controls(props) {
    _classCallCheck(this, Controls);

    var _this = _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this, props));

    _this.pauseResumeGame = _this.pauseResumeGame.bind(_this);
    _this.restartGame = _this.restartGame.bind(_this);
    _this.loop = _this.loop.bind(_this);
    _this.startCountDown();
    return _this;
  }

  _createClass(Controls, [{
    key: 'loop',
    value: function loop() {
      if (_gemCollector2.default.time == 0 && _gemCollector2.default.mode != 'restart' && _gemCollector2.default.mode != 'pause') {
        _gemCollector2.default.mode = 'pause';
        if (this.props.onEnd) {
          var player = _gemCollector2.default.score[0] > _gemCollector2.default.score[1] ? 'player1' : 'player2';
          this.props.onEnd(player);
        }
      }
    }
  }, {
    key: 'startCountDown',
    value: function startCountDown() {
      setInterval(function () {
        if (_gemCollector2.default.mode == 'play' && _gemCollector2.default.time > 0) _gemCollector2.default.time--;
      }, 1000);
    }
  }, {
    key: 'pauseResumeGame',
    value: function pauseResumeGame() {
      if (_gemCollector2.default.mode == 'pause') {
        _gemCollector2.default.mode = 'play';
        if (this.props.onPlay) {
          this.props.onPlay();
        }
      } else {
        _gemCollector2.default.mode = 'pause';
        if (this.props.onPause) {
          this.props.onPause();
        }
      }
    }
  }, {
    key: 'restartGame',
    value: function restartGame() {
      var _this2 = this;

      _gemCollector2.default.mode = 'restart';
      setTimeout(function () {
        _gemCollector2.default.mode = 'play';
        if (_this2.props.onPlay) _this2.props.onPlay();
      }, 1000);
    }
  }, {
    key: 'getWrapperStyles',
    value: function getWrapperStyles() {
      return {
        position: 'absolute',
        transform: 'translate(0px, 0px) translateZ(0)',
        transformOrigin: 'top left'
      };
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
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _gemCollector2.default.time == 0 && _react2.default.createElement(
          'div',
          { style: {
              position: 'absolute',
              background: '#7eca84',
              width: '100%',
              height: '100%',
              zIndex: 2
            } },
          _react2.default.createElement(
            'h1',
            { style: {
                marginTop: '30%',
                textAlign: 'center',
                color: '#fff'
              } },
            _gemCollector2.default.score[0] > _gemCollector2.default.score[1] ? 'Player 1 Win!!!' : 'Player 2 Win!!!'
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this3.restartGame();
              },
              style: {
                width: '30%',
                marginLeft: '35%',
                height: '40px',
                background: '#7eca84',
                border: '3px solid #fff',
                fontSize: '19px',
                textTransform: 'uppercase',
                color: '#fff',
                lineHeight: '36px'
              }
            },
            'Restart'
          )
        ),
        _react2.default.createElement(
          'h3',
          { style: { position: 'fixed', left: 0, top: '12px', zIndex: 1 } },
          'Player 1 score: ',
          _gemCollector2.default.score[0]
        ),
        _react2.default.createElement(
          'h3',
          { style: { position: 'fixed', right: 0, top: '12px', zIndex: 1 } },
          'Player 2 score: ',
          _gemCollector2.default.score[1]
        ),
        _react2.default.createElement(
          'h3',
          { style: { position: 'fixed', left: '45%', top: 0 } },
          'Time left: ',
          _gemCollector2.default.time
        ),
        _react2.default.createElement(
          'button',
          { style: { position: 'fixed', left: 0, top: 0, zIndex: 1 }, onClick: function onClick() {
              return _this3.restartGame();
            } },
          'Restart'
        ),
        _react2.default.createElement(
          'button',
          { style: { position: 'fixed', left: '70px', top: 0, zIndex: 1 }, onClick: function onClick() {
              return _this3.pauseResumeGame();
            } },
          _gemCollector2.default.mode == 'play' ? 'Pause' : 'Resume'
        )
      );
    }
  }]);

  return Controls;
}(_react.Component), _class.contextTypes = {
  loop: _propTypes2.default.object
}, _temp);
exports.default = (0, _mobxReact.observer)(Controls);