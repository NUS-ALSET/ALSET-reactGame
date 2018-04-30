import React from 'react';
import Games from '../../../build/';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello from component</h1>
        <Games />
      </div>
    );
  }
}
