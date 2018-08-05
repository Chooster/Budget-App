import React, { Component } from 'react';

import Logo from '../static/images/divvy_logo.png';

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={Logo} className="App-logo" alt="logo" />
        </header>

        <main>{this.props.children}</main>
      </div>
    );
  }
}
