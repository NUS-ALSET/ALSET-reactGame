'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Sprite = require('./Sprite');

var _Sprite2 = _interopRequireDefault(_Sprite);

var _mobxReact = require('mobx-react');

var _brunette = require('../../commonGameAssets/characters/brunette.png');

var _brunette2 = _interopRequireDefault(_brunette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Brunette = function (_Component) {
  _inherits(Brunette, _Component);

  function Brunette() {
    _classCallCheck(this, Brunette);

    return _possibleConstructorReturn(this, (Brunette.__proto__ || Object.getPrototypeOf(Brunette)).apply(this, arguments));
  }

  _createClass(Brunette, [{
    key: 'getAnimationState',
    value: function getAnimationState() {
      switch (this.props.direction) {
        case 'up':
          this.animState = 8;
          break;
        case 'down':
          this.animState = 10;
          break;
        case 'left':
          this.animState = 9;
          break;
        case 'right':
          this.animState = 11;
          break;
        default:
          this.animState = 8;
          break;
      }
    }
  }, {
    key: 'getWrapperStyles',
    value: function getWrapperStyles() {
      this.getAnimationState();
      var targetX = this.props.position.x;
      var targetY = this.props.position.y;
      return {
        position: 'absolute',
        transform: 'translate(' + targetX + 'px, ' + targetY + 'px)',
        transformOrigin: 'left top'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'character', style: this.getWrapperStyles() },
        _react2.default.createElement(_Sprite2.default, {
          repeat: true,
          tileWidth: 64,
          tileHeight: 64,
          src: _brunette2.default,
          ticksPerFrame: 4,
          state: this.animState,
          scale: 1,
          steps: [6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 5, 5, 5, 5, 12, 12, 12, 12, 5]
        })
      );
    }
  }]);

  return Brunette;
}(_react.Component);

exports.default = (0, _mobxReact.observer)(Brunette);