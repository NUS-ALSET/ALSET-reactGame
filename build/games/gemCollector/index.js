'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _code = require('./code/');

var _code2 = _interopRequireDefault(_code);

var _customCode = require('../../customCode');

var _customCode2 = _interopRequireDefault(_customCode);

var _brace = require('brace');

var _brace2 = _interopRequireDefault(_brace);

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

require('brace/mode/javascript');

require('brace/theme/github');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _gameStore = require('./store/game-store1');

var _gameStore2 = _interopRequireDefault(_gameStore);

var _gameStore3 = require('./store/game-store2');

var _gameStore4 = _interopRequireDefault(_gameStore3);

var _gameStore5 = require('./store/game-store3');

var _gameStore6 = _interopRequireDefault(_gameStore5);

var _gameStore7 = require('./store/game-store4');

var _gameStore8 = _interopRequireDefault(_gameStore7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// stores


var selectStore = function selectStore(mode) {
  switch (mode) {
    case 'player-vs-player':
      {
        return _gameStore2.default;
      }
    case 'player-vs-bot':
      {
        return _gameStore4.default;
      }
    case 'bot-vs-bot':
      {
        return _gameStore6.default;
      }
    case 'bot-vs-custom-code':
      {
        return _gameStore8.default;
      }
    default:
      {
        return _gameStore4.default;
      }
  }
};

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1,
      padding: '0px 10px'
    },
    paper: {
      textAlign: 'center',
      padding: '40px 20px',
      cursor: 'pointer'
    },
    control: {
      padding: theme.spacing.unit * 2
    },
    button: {
      margin: theme.spacing.unit
    }
  };
};

var PlayGemCollectorGame = function (_Component) {
  _inherits(PlayGemCollectorGame, _Component);

  function PlayGemCollectorGame(props) {
    _classCallCheck(this, PlayGemCollectorGame);

    var _this = _possibleConstructorReturn(this, (PlayGemCollectorGame.__proto__ || Object.getPrototypeOf(PlayGemCollectorGame)).call(this, props));

    _this.initGemCollector = function () {
      var _this$props = _this.props,
          config = _this$props.config,
          mode = _this$props.mode;
      var _this$state = _this.state,
          store = _this$state.store,
          showMode = _this$state.showMode,
          showScore = _this$state.showScore;

      switch (mode) {
        case 'player-vs-player':
          {
            return _react2.default.createElement(_code2.default, {
              store: store,
              config: config,
              mode: mode,
              onGameEvent: _this.handleGameEvents,
              onWin: function onWin(winner) {
                return _this.onWin(winner);
              }
            });
          }
        case 'player-vs-bot':
          {
            return _react2.default.createElement(_code2.default, {
              store: store,
              config: config,
              mode: mode,
              onWin: function onWin(winner) {
                return _this.onWin(winner);
              },
              onGameEvent: _this.handleGameEvents,
              player2Function: function player2Function(world) {
                return _this.getCommands(world, 2);
              }
            });
          }
        case 'bot-vs-bot':
          {
            return _react2.default.createElement(_code2.default, {
              store: store,
              config: config,
              mode: mode,
              onWin: function onWin(winner) {
                return _this.onWin(winner);
              },
              onGameEvent: _this.handleGameEvents,
              player1Function: function player1Function(world) {
                return _this.getCommands(world, 1);
              },
              player2Function: function player2Function(world) {
                return _this.getCommands(world, 2);
              }
            });
          }
        case 'bot-vs-custom-code':
          {
            return _react2.default.createElement(_code2.default, {
              store: store,
              config: config,
              mode: mode,
              onWin: function onWin(winner) {
                return _this.onWin(winner);
              },
              onGameEvent: _this.handleGameEvents,
              player1Function: function player1Function(world) {
                return _this.getPlayersCommands(world, 1);
              },
              player2Function: function player2Function(world) {
                return _this.getCommands(world, 2);
              }
            });
          }
        default:
          {
            // player-vs-bot
            return _react2.default.createElement(_code2.default, {
              store: store,
              config: config,
              mode: mode,
              onWin: function onWin(winner) {
                return _this.onWin(winner);
              },
              onGameEvent: _this.handleGameEvents,
              player2Function: function player2Function(world) {
                return _this.getCommands(world, 2);
              }
            });
          }
      }
    };

    _this.initFunctionEditor = function () {
      var classes = _this.props.classes;
      var updatedCode = _this.state.updatedCode;

      return _react2.default.createElement(
        'div',
        null,
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
          onChange: _this.handleChange,
          onValidate: _this.handleValidation,
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
          { variant: 'raised', color: 'primary', onClick: _this.updateCustomCode, className: classes.button },
          'Update code'
        )
      );
    };

    _this.state = {
      customFunctionCode: _customCode2.default,
      updatedCode: _customCode2.default,
      timestamp: 0,
      timing: 1000,
      showMode: true,
      showScore: true,
      scores: [0, 0],
      winner: null,
      playGame: null,
      errors: [],
      store: selectStore(_this.props.mode)
    };
    _this.getCommands = _this.getCommands.bind(_this);
    _this.getPlayersCommands = _this.getPlayersCommands.bind(_this);
    _this.updateCustomCode = _this.updateCustomCode.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleValidation = _this.handleValidation.bind(_this);
    _this.handleGameEvents = _this.handleGameEvents.bind(_this);
    _this.onWin = _this.onWin.bind(_this);
    _this.toggleScore = _this.toggleScore.bind(_this);
    _this.toggleMode = _this.toggleMode.bind(_this);
    return _this;
  }

  _createClass(PlayGemCollectorGame, [{
    key: 'handleGameEvents',
    value: function handleGameEvents(event) {
      if (event.type === 'score_update') {
        if (event.scores[0] !== this.state.scores[0] || event.scores[1] !== this.state.scores[1]) {
          this.setState({ scores: event.scores });
        }
      }

      this.props.onGameEvent(event);
    }
  }, {
    key: 'onWin',
    value: function onWin(winner) {
      console.log('Winner..', winner);
      // this.setState({winner : winner});
    }
  }, {
    key: 'toggleMode',
    value: function toggleMode() {
      this.setState({ showMode: !this.state.showMode });
    }
  }, {
    key: 'toggleScore',
    value: function toggleScore() {
      this.setState({ showScore: !this.state.showScore });
    }
  }, {
    key: 'getCommands',
    value: function getCommands(world, playerNum) {
      //let player = world.bodies.find(body=>{if(body.label==="character"&&body.customId===playerNum-1) return body;});
      var player = world.players[playerNum - 1];
      var closestGem = false;
      world.stones.forEach(function (stone) {
        if (closestGem === false) closestGem = stone;else if (Math.abs(Math.sqrt(closestGem.x * closestGem.x + closestGem.y * closestGem.y) - Math.sqrt(player.x * player.x + player.y * player.y)) > Math.abs(Math.sqrt(stone.x * stone.x + stone.y * stone.y) - Math.sqrt(player.x * player.x + player.y * player.y))) {
          closestGem = stone;
        }
      });
      if (closestGem) {
        if (closestGem.x - player.x > 10) {
          return { left: false, right: true, up: false, down: false };
        } else if (closestGem.x - player.x < -10) {
          return { left: true, right: false, up: false, down: false };
        } else if (closestGem.y - player.y > 10) {
          return { left: false, right: false, up: false, down: true };
        } else if (closestGem.y - player.y < -10) {
          return { left: false, right: false, up: true, down: false };
        }
      } else if (Date.now() - this.state.timestamp >= this.state.timing) {
        var newState = Math.floor(Math.random() * (11 - 8 + 1) + 8);
        this.setState({ timestamp: Date.now() });
        if (newState === 11) {
          return { left: false, right: true, up: false, down: false };
        } else if (newState === 10) {
          return { left: false, right: false, up: false, down: true };
        } else if (newState === 9) {
          return { left: true, right: false, up: false, down: false };
        } else if (newState === 8) {
          return { left: false, right: false, up: true, down: false };
        }
      }
    }
  }, {
    key: 'getPlayersCommands',
    value: function getPlayersCommands(world, playerNum) {
      try {
        var expression = this.state.customFunctionCode;
        var result = eval('(function() {' + expression + '}())');
        return result;
      } catch (err) {
        //console.log(err);
      }
    }
  }, {
    key: 'updateCustomCode',
    value: function updateCustomCode() {
      if (this.state.errors.length > 0) {
        console.log(this.state.errors);
        alert('Invalid code,please correct thr code');
        return;
      }
      this.props.onGameEvent({
        type: 'code_updated'
      });
      this.setState({ customFunctionCode: this.state.updatedCode });
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
      var _props$showCodeEditor = this.props.showCodeEditor,
          showCodeEditor = _props$showCodeEditor === undefined ? false : _props$showCodeEditor;

      return _react2.default.createElement(
        'div',
        null,
        this.initGemCollector(),
        showCodeEditor && this.initFunctionEditor()
      );
    }
  }]);

  return PlayGemCollectorGame;
}(_react.Component);

PlayGemCollectorGame.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  onGameEvent: _propTypes2.default.func,
  showCodeEditor: _propTypes2.default.bool,
  mode: _propTypes2.default.string
};

PlayGemCollectorGame.defaultProps = {
  mode: _config2.default.mode,
  onGameEvent: function onGameEvent() {},
  onWin: function onWin() {},
  showCodeEditor: _config2.default.showCodeEditor
};

exports.default = (0, _styles.withStyles)(styles)(PlayGemCollectorGame);