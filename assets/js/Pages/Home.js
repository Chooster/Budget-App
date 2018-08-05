import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class Home extends Component {
  state = {
    users: [
      { name: 'Murr', id: 98343 },
      { name: 'Joe', id: 98344 },
      { name: 'Sal', id: 98345 },
      { name: 'Quinn', id: 98346 }
    ]
  };

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Welcome</h1>
        <p className="App-intro">
          To get started, click below to select a <code>user</code>.
        </p>
        <div>
          {this.state.users.map(user => {
            return (
              <Link to={`/user/${user.id}`}>
                <Button bsStyle="primary">{user.name}</Button>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
