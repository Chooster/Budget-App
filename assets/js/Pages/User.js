import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import axios from 'axios';

import CreateBudget from '../Components/CreateBudget';
import CreateTransaction from '../Components/CreateTransaction';
import Transactions from '../Components/Transactions';

export default class Budget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.location.state.user
    };
  }

  componentDidMount() {
    this.getBudgets();
    this.getTransactions();
  }

  getBudgets = () => {
    axios
      .get('http://localhost:4000/api/budgets')
      .then(res => this.setState({ budgets: res.data.data }))
      .catch(err => console.log(err));
  };

  getTransactions = () => {
    axios
      .get('http://localhost:4000/api/transactions')
      .then(res => this.setState({ transactions: res.data.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="Budget">
        <PageHeader style={{ margin: '0 auto', width: '90vw' }}>
          {`Welcome ${this.state.user}!\n`}
          <small>{`Track your spending here`}</small>
        </PageHeader>
        <div className="User-display">
          {'You can'}
          <CreateBudget refreshBudgets={this.getBudgets} />
          {'or'}
          <CreateTransaction
            user={this.state.user}
            budgets={this.state.budgets}
            refreshTransactions={this.getTransactions}
          />
          <Transactions
            user={this.state.user}
            transactions={this.state.transactions}
          />
        </div>
      </div>
    );
  }
}
