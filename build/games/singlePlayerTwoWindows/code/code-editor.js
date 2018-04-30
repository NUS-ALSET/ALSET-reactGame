'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _singlePlayerTwoWindows = require('./store/singlePlayerTwoWindows');

var _singlePlayerTwoWindows2 = _interopRequireDefault(_singlePlayerTwoWindows);

var _styles = require('material-ui/styles');

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _brace = require('brace');

var _brace2 = _interopRequireDefault(_brace);

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

require('brace/mode/javascript');

require('brace/theme/github');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomFunctionCode = 'var player = world.player;\nvar closestGem = false;\nworld.collectives.forEach(stone => {\n    if(closestGem==false)\n        closestGem = stone;\n    else if(\n        Math.sqrt(Math.pow((player.x-closestGem.x),2)+Math.pow((player.y-closestGem.y),2))>\n        Math.sqrt(Math.pow((player.x-stone.x),2)+Math.pow((player.y-stone.y),2))\n    ){\n        closestGem = stone;\n    }\n});\nif(closestGem){\n    if(closestGem.x-player.x>64){\n        var direction = {left:false, right:true, up:false, down:false};\n    }   \n    else if(closestGem.x-player.x<0){\n        var direction = {left:true, right:false, up:false, down:false};\n    }\n    else if(closestGem.y-player.y>64){\n        var direction = {left:false, right:false, up:false, down:true};\n    }\n    else if(closestGem.y-player.y<0){\n        var direction = {left:false, right:false, up:true, down:false};\n    }\n    return direction;\n}';

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1,
      padding: '0px 10px'
    },
    control: {
      padding: theme.spacing.unit * 2
    },
    button: {
      margin: theme.spacing.unit
    }
  };
};

var CodeEditor = function (_Component) {
  _inherits(CodeEditor, _Component);

  function CodeEditor(props) {
    _classCallCheck(this, CodeEditor);

    var _this = _possibleConstructorReturn(this, (CodeEditor.__proto__ || Object.getPrototypeOf(CodeEditor)).call(this, props));

    _this.state = {
      customFunctionCode: CustomFunctionCode,
      updatedCode: CustomFunctionCode,
      errors: []

    };
    _this.updateCustomCode = _this.updateCustomCode.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleValidation = _this.handleValidation.bind(_this);
    return _this;
  }

  _createClass(CodeEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _singlePlayerTwoWindows2.default.func = this.state.updatedCode;
    }
  }, {
    key: 'updateCustomCode',
    value: function updateCustomCode() {
      if (this.state.errors.length > 0) {
        console.log(this.state.errors);
        alert('Invalid code,please correct thr code');
        return;
      }
      this.setState({ customFunctionCode: this.state.updatedCode });
      _singlePlayerTwoWindows2.default.func = this.state.updatedCode;
      //Store.funcNeedUpdate = true;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(newCode) {
      this.setState({ updatedCode: newCode });
    }
  }, {
    key: 'handleValidation',
    value: function handleValidation(messages) {
      var errors = messages.filter(function (msg) {
        return msg.type === 'error' ? true : false;
      });
      this.setState({ errors: errors });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = this.props.classes;
      var updatedCode = this.state.updatedCode;

      return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
          'h4',
          null,
          'function getPlayersCommands(world, playerNum){'
        ),
        _react2.default.createElement(_reactAce2.default, {
          mode: 'javascript',
          theme: 'github',
          name: 'customFunctionCodeEditor',
          width: '100%',
          onChange: this.handleChange,
          onValidate: this.handleValidation,
          fontSize: 14,
          showPrintMargin: true,
          showGutter: true,
          highlightActiveLine: true,
          value: updatedCode,
          setOptions: {
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }
        }),
        _react2.default.createElement(
          'h4',
          null,
          '}'
        ),
        _react2.default.createElement(
          _Button2.default,
          { variant: 'raised', color: 'primary', onClick: this.updateCustomCode, className: classes.button },
          'Update code'
        )
      );
    }
  }]);

  return CodeEditor;
}(_react.Component);

exports.default = (0, _styles.withStyles)(styles)(CodeEditor);