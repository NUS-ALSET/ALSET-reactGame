import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Store from './store/passengerPickup';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';

const CustomFunctionCode = `var player = world.player;
var closestGem = false;
if(world.freePlaces<4){
  world.collectives.forEach(stone => {
    if (closestGem == false) closestGem = stone;
    else if (
      Math.sqrt(
        Math.pow(player.x - closestGem.x, 2) +
          Math.pow(player.y - closestGem.y, 2)
      ) >
      Math.sqrt(
        Math.pow(player.x - stone.x, 2) + Math.pow(player.y - stone.y, 2)
      )
    ) {
      closestGem = stone;
    }
  });
}else{
  closestGem = {x:0, y:0};
}
if (closestGem) {
  if (closestGem.x - player.x > 64) {
    var direction = { left: false, right: true, up: false, down: false };
  } else if (closestGem.x - player.x < 0) {
    var direction = { left: true, right: false, up: false, down: false };
  } else if (closestGem.y - player.y > 64) {
    var direction = { left: false, right: false, up: false, down: true };
  } else if (closestGem.y - player.y < 0) {
    var direction = { left: false, right: false, up: true, down: false };
  }
  return direction;
}`;

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customFunctionCode: CustomFunctionCode,
      updatedCode: CustomFunctionCode,
      errors: [],

    };
    this.updateCustomCode = this.updateCustomCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }
  componentDidMount() {
    Store.func = this.state.updatedCode;
  }

  updateCustomCode() {
    if (this.state.errors.length > 0) {
      console.log(this.state.errors);
      alert('Invalid code,please correct thr code');
      return;
    }
    this.setState({ customFunctionCode: this.state.updatedCode });
    Store.func = this.state.updatedCode;
    //Store.funcNeedUpdate = true;
  }
  handleChange(newCode) {
    this.setState({ updatedCode: newCode });
  }
  handleValidation(messages) {
    const errors = messages.filter(msg => (msg.type === 'error' ? true : false));
    this.setState({ errors: errors });
  }

  render() {
    const { updatedCode } = this.state;
    return <div>
      <h4>{'function getPlayersCommands(world, playerNum){'}</h4>
      <AceEditor
        mode="javascript"
        theme="github"
        name="customFunctionCodeEditor"
        width={'100%'}
        onChange={this.handleChange}
        onValidate={this.handleValidation}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={updatedCode}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <h4>{'}'}</h4>
      <button onClick={this.updateCustomCode} >
        Update code
       </button>
    </div>;
  }
}
export default CodeEditor;