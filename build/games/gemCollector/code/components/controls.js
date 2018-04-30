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

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controls = (_temp = _class = function (_Component) {
  _inherits(Controls, _Component);

  function Controls(props) {
    _classCallCheck(this, Controls);

    return _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this, props));
  }

  _createClass(Controls, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'controls-wraper' },
        _react2.default.createElement(
          'div',
          {
            onClick: function onClick() {
              _this2.props.store.mode = 'restart';
              _this2.props.store.score = [0, 0];
              _this2.props.onGameEvent({
                type: 'restart'
              });
              setTimeout(function () {
                _this2.props.store.mode = 'play';
              }, 1000);
            },
            className: 'controls-wraper-child'
          },
          'restart'
        ),
        this.props.store.mode === 'play' ? _react2.default.createElement(
          'div',
          {
            onClick: function onClick() {
              _this2.props.store.mode = 'pause';
              _this2.props.onGameEvent({
                type: 'pause'
              });
            },
            className: 'controls-wraper-child'
          },
          'pause'
        ) : _react2.default.createElement(
          'div',
          {
            onClick: function onClick() {
              _this2.props.store.mode = 'play';
              _this2.props.onGameEvent({
                type: 'resume'
              });
            },
            className: 'controls-wraper-child'
          },
          'resume'
        )
      );
    }
  }]);

  return Controls;
}(_react.Component), _class.propTypes = {
  store: _propTypes2.default.object
}, _class.contextTypes = {
  engine: _propTypes2.default.object,
  scale: _propTypes2.default.number
}, _temp);
exports.default = (0, _mobxReact.observer)(Controls);