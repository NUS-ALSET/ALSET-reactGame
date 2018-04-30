'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGameKit = require('react-game-kit');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _building = require('../../commonGameAssets/tiles/building.png');

var _building2 = _interopRequireDefault(_building);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Building = (_temp = _class = function (_Component) {
  _inherits(Building, _Component);

  function Building(props) {
    _classCallCheck(this, Building);

    return _possibleConstructorReturn(this, (Building.__proto__ || Object.getPrototypeOf(Building)).call(this, props));
  }

  _createClass(Building, [{
    key: 'getWrapperStyles',
    value: function getWrapperStyles() {
      return {
        position: 'absolute',
        transform: 'translate(0px, 0px) translateZ(0)',
        transformOrigin: 'top left'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var tileData = this.props.tileData;
      return _react2.default.createElement(
        'div',
        { style: this.getWrapperStyles() },
        _react2.default.createElement(_reactGameKit.TileMap, {
          style: { top: 0, left: 0 },
          src: _building2.default,
          rows: tileData.rows,
          columns: tileData.columns,
          tileSize: tileData.tileSize / this.context.scale,
          layers: tileData.layers
        })
      );
    }
  }]);

  return Building;
}(_react.Component), _class.contextTypes = {
  scale: _propTypes2.default.number
}, _temp);
exports.default = Building;