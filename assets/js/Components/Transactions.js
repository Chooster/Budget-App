import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

export default class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      transactions: props.transactions || []
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.transactions.length !== state.transactions.length) {
  //     return {
  //       transactions: props.transactions
  //     };
  //   }
  //   return null;
  // }

  componentWillReceiveProps(nextProps) {
    if (this.state.transactions !== nextProps.transactions) {
      this.setState({ transactions: nextProps.transactions });
    }
  }

  render() {
    // console.log(`transactions: ${this.state.transactions}`);
    return (
      <div className="Transaction-table">
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Budget</th>
              <th>Amount</th>
              <th>Category</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions &&
              this.state.transactions
                .filter(t => t.user === this.state.user)
                .map(transaction => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.budget_name}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.user}</td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
