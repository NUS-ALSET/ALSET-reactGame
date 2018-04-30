'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGameKit = require('react-game-kit');

var _Grass = require('../../../commonComponents/Tiles/Grass');

var _Grass2 = _interopRequireDefault(_Grass);

var _Sand = require('../../../commonComponents/Tiles/Sand');

var _Sand2 = _interopRequireDefault(_Sand);

var _Concrete = require('../../../commonComponents/Tiles/Concrete');

var _Concrete2 = _interopRequireDefault(_Concrete);

var _Building = require('../../../commonComponents/Tiles/Building');

var _Building2 = _interopRequireDefault(_Building);

var _RoadCross = require('../../../commonComponents/Tiles/RoadCross');

var _RoadCross2 = _interopRequireDefault(_RoadCross);

var _RoadLeftRight = require('../../../commonComponents/Tiles/RoadLeftRight');

var _RoadLeftRight2 = _interopRequireDefault(_RoadLeftRight);

var _RoadUpDown = require('../../../commonComponents/Tiles/RoadUpDown');

var _RoadUpDown2 = _interopRequireDefault(_RoadUpDown);

var _Roof = require('../../../commonComponents/Tiles/Roof');

var _Roof2 = _interopRequireDefault(_Roof);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tile = function (_Component) {
  _inherits(Tile, _Component);

  function Tile() {
    _classCallCheck(this, Tile);

    return _possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).apply(this, arguments));
  }

  _createClass(Tile, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.tiles.map(function (tile, index) {
          switch (tile.type) {
            case 'grass':
              return _react2.default.createElement(_Grass2.default, { key: index, tileData: tile });
            case 'concrete':
              return _react2.default.createElement(_Concrete2.default, { key: index, tileData: tile });
            case 'sand':
              return _react2.default.createElement(_Sand2.default, { key: index, tileData: tile });
            case 'building':
              return _react2.default.createElement(_Building2.default, { key: index, tileData: tile });
            case 'roadCross':
              return _react2.default.createElement(_RoadCross2.default, { key: index, tileData: tile });
            case 'roadLeftRight':
              return _react2.default.createElement(_RoadLeftRight2.default, { key: index, tileData: tile });
            case 'roadUpDown':
              return _react2.default.createElement(_RoadUpDown2.default, { key: index, tileData: tile });
            case 'roof':
              return _react2.default.createElement(_Roof2.default, { key: index, tileData: tile });
            default:
              return _react2.default.createElement(_Grass2.default, { key: index, tileData: tile });
          }
        })
      );
    }
  }]);

  return Tile;
}(_react.Component);

exports.default = Tile;