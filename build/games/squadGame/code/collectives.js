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

var _squad = require('./store/squad');

var _squad2 = _interopRequireDefault(_squad);

var _Coin = require('../../../commonComponents/Collectives/Coin');

var _Coin2 = _interopRequireDefault(_Coin);

var _Gem = require('../../../commonComponents/Collectives/Gem');

var _Gem2 = _interopRequireDefault(_Gem);

var _Passenger = require('../../../commonComponents/Collectives/Passenger');

var _Passenger2 = _interopRequireDefault(_Passenger);

var _Passengers = require('../../../commonComponents/Collectives/Passengers');

var _Passengers2 = _interopRequireDefault(_Passengers);

var _Trash = require('../../../commonComponents/Collectives/Trash1');

var _Trash2 = _interopRequireDefault(_Trash);

var _Trash3 = require('../../../commonComponents/Collectives/Trash2');

var _Trash4 = _interopRequireDefault(_Trash3);

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collectives = (_temp = _class = function (_Component) {
  _inherits(Collectives, _Component);

  function Collectives() {
    _classCallCheck(this, Collectives);

    var _this = _possibleConstructorReturn(this, (Collectives.__proto__ || Object.getPrototypeOf(Collectives)).call(this));

    _this.loop = function () {
      _squad2.default.generateCollectives(_this.props.gameId, _this.props.min, _this.props.max, _this.props.size);
    };

    return _this;
  }

  _createClass(Collectives, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loopID = this.context.loop.subscribe(this.loop);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('unmounting collective');
      this.context.loop.unsubscribe(this.loopID);
    }
  }, {
    key: 'render',
    value: function render() {
      switch (this.props.type) {
        case 'coin':
          return _react2.default.createElement(
            'div',
            null,
            _squad2.default.collectives[this.props.gameId].map(function (collective, index) {
              return _react2.default.createElement(_Coin2.default, { key: index, collectiveData: collective, index: index });
            })
          );
        case 'gem':
          return _react2.default.createElement(
            'div',
            null,
            _squad2.default.collectives[this.props.gameId].map(function (collective, index) {
              return _react2.default.createElement(_Gem2.default, { key: index, collectiveData: collective, index: index });
            })
          );
        case 'passenger':
          return _react2.default.createElement(
            'div',
            null,
            _squad2.default.collectives[this.props.gameId].map(function (collective, index) {
              return _react2.default.createElement(_Passenger2.default, { key: index, collectiveData: collective, index: index });
            })
          );
        case 'passengers':
          return _react2.default.createElement(
            'div',
            null,
            _squad2.default.collectives[this.props.gameId].map(function (collective, index) {
              return _react2.default.createElement(_Passengers2.default, { key: index, collectiveData: collective, index: index });
            })
          );
        case 'trash1':
          return _react2.default.createElement(
            'div',
            null,
            _squad2.default.collectives[this.props.gameId].map(function (collective, index) {
              return _react2.default.createElement(_Trash2.default, { key: index, collectiveData: collective, index: index });
            })
          );
        case 'trash2':
          return _react2.default.createElement(
            'div',
            null,
            _squad2.default.collectives[this.props.gameId].map(function (collective, index) {
              return _react2.default.createElement(_Trash4.default, { key: index, collectiveData: collective, index: index });
            })
          );
        default:
          return _react2.default.createElement(
            'div',
            null,
            _squad2.default.collectives[this.props.gameId].map(function (collective, index) {
              return _react2.default.createElement(_Coin2.default, { key: index, collectiveData: collective, index: index });
            })
          );
      }
    }
  }]);

  return Collectives;
}(_react.Component), _class.contextTypes = {
  loop: _propTypes2.default.object,
  scale: _propTypes2.default.number
}, _temp);
exports.default = (0, _mobxReact.observer)(Collectives);