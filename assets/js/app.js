// for phoenix_html support, including form and button helpers
// copy the following scripts into your javascript bundle:
// * https://raw.githubusercontent.com/phoenixframework/phoenix_html/v2.10.0/priv/static/phoenix_html.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { routes } from './routes';

class BudgetApp extends Component {
  render() {
    return <h1>Budget App!</h1>;
  }
}

ReactDOM.render(
  <Router children={routes} />,
  document.getElementById('Budget-app')
);
