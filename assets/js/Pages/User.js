import React, { Component } from 'react';

import CreateBudget from '../Components/CreateBudget';
import CreateTransaction from '../Components/CreateTransaction';
import Transactions from '../Components/Transactions';

export default class Budget extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="Budget">
        <CreateBudget />
        <CreateTransaction />
        <Transactions />
      </div>
    );
  }
}
