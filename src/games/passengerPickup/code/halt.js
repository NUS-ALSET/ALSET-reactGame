import React, { Component } from 'react';
import img from "../../../commonGameAssets/obstacles/halt.png";

export default class Halt extends Component {
  constructor(props) {
    super(props);
  }

  getWrapperStyles() {
    return {
      position: 'absolute',
      transform: 'translate(0px, 0px) translateZ(0)',
      transformOrigin: 'top left',
      width: "100px",
      height: "100px"
    };
  }

  render() {
    return (
      <div className={'halt'} style={this.getWrapperStyles()} >
        <img
          style={{ 'width': '100%', 'height': '100%' }}
          src={img}
        />
      </div>
    );
  }
}