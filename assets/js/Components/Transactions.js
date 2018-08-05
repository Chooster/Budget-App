import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class Transactions extends Component {
  render() {
    return (
      <div className="Transaction-table">
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Budget</th>
              <th>Amount</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Marketing</td>
              <td>100</td>
              <td>Sal</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
