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

var _matterJs = require('matter-js');

var _matterJs2 = _interopRequireDefault(_matterJs);

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WinLoseScreen = (_temp = _class = function (_Component) {
  _inherits(WinLoseScreen, _Component);

  function WinLoseScreen(props) {
    _classCallCheck(this, WinLoseScreen);

    var _this = _possibleConstructorReturn(this, (WinLoseScreen.__proto__ || Object.getPrototypeOf(WinLoseScreen)).call(this, props));

    _this.winText = '';
    _this.checkScore = _this.checkScore.bind(_this);
    _this.update = _this.update.bind(_this);
    _this.gatherToWin = _this.props.store.config.gatherToWin;
    return _this;
  }

  _createClass(WinLoseScreen, [{
    key: 'update',
    value: function update() {
      if (this.props.store.score[0] >= this.gatherToWin || this.props.store.score[1] >= this.gatherToWin) {
        this.props.store.mode = 'pause';
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _matterJs2.default.Events.on(this.context.engine, 'afterUpdate', this.update);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _matterJs2.default.Events.off(this.context.engine, 'afterUpdate', this.update);
    }
  }, {
    key: 'checkScore',
    value: function checkScore() {
      if (this.props.store.score[0] >= this.gatherToWin) {
        this.winText = 'Player 1 Wins!!!';
        this.props.onWin({ winner: 0 });
        return true;
      } else if (this.props.store.score[1] >= this.gatherToWin) {
        this.winText = 'Player 2 Wins!!!';
        this.props.onWin({ winner: 1 });
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        this.checkScore() && _react2.default.createElement(
          'div',
          { className: 'winLose-wrapper' },
          _react2.default.createElement(
            'h1',
            { style: { textAlign: 'center', marginTop: '20%', color: '#fff' } },
            this.winText
          ),
          _react2.default.createElement(
            'button',
            {
              className: 'winLose-screen',
              onClick: function onClick() {
                _this2.props.store.mode = 'restart';
                _this2.props.onGameEvent({
                  type: 'restart'
                });
                _this2.props.store.score = [0, 0];
                setTimeout(function () {
                  _this2.props.store.mode = 'play';
                }, 1000);
              }
            },
            'Restart Game'
          )
        )
      );
    }
  }]);

  return WinLoseScreen;
}(_react.Component), _class.propTypes = {
  store: _propTypes2.default.object,
  onScoreUpdate: _propTypes2.default.func
}, _class.contextTypes = {
  engine: _propTypes2.default.object,
  scale: _propTypes2.default.number
}, _temp);
exports.default = (0, _mobxReact.observer)(WinLoseScreen);