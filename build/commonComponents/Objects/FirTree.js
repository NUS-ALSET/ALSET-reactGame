'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGameKit = require('react-game-kit');

var _firTree = require('../../commonGameAssets/obstacles/fir-tree.png');

var _firTree2 = _interopRequireDefault(_firTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bush = function (_Component) {
  _inherits(Bush, _Component);

  function Bush(props) {
    _classCallCheck(this, Bush);

    return _possibleConstructorReturn(this, (Bush.__proto__ || Object.getPrototypeOf(Bush)).call(this, props));
  }

  _createClass(Bush, [{
    key: 'getWrapperStyles',
    value: function getWrapperStyles() {
      var obstacleData = this.props.obstacleData;
      return {
        position: 'absolute',
        transform: 'translate(' + this.props.obstacleData.x + 'px, ' + this.props.obstacleData.y + 'px) translateZ(0)',
        transformOrigin: 'top left',
        width: obstacleData.width,
        height: obstacleData.height
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'obstacle', style: this.getWrapperStyles() },
        _react2.default.createElement('img', {
          style: { 'width': '100%', 'height': '100%' },
          src: _firTree2.default
        })
      );
    }
  }]);

  return Bush;
}(_react.Component);

exports.default = Bush;