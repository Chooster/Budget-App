import React, { Component } from 'react';
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import axios from 'axios';

import FieldGroup from './FieldGroup';

export default class CreateTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      budgets: props.budgets || [],
      user: props.user
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.budgets !== nextProps.budgets) {
      this.setState({ budgets: nextProps.budgets });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { budgets, budget, amount, user, category } = this.state;
    console.log(JSON.stringify(this.state));
    axios
      .post('http://localhost:4000/api/transactions', {
        headers: { 'Content-Type': 'application/json' },
        transaction: {
          budget_id: budgets[budget].id,
          budget_name: budgets[budget].name,
          amount: amount,
          user: user,
          category: category
        }
      })
      .then(res => {
        console.log(res);
        axios
          .put(`http://localhost:4000/api/budgets/${budgets[budget].id}`, {
            headers: { 'Content-Type': 'application/json' },
            budget: {
              id: budget,
              amount: budgets[budget].amount - amount
            }
          })
          .then(updated => {
            console.log(updated);
            this.props.refreshTransactions();
          })
          .catch(update_err => console.log(update_err));
        this.handleHide();
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleShow = () => this.setState({ show: true });

  handleHide = () => this.setState({ show: false });

  getValidationState = () => {
    const { amount, budget, category, budgets } = this.state;
    if (
      budget &&
      category &&
      budgets.length &&
      amount > 0 &&
      amount <= budgets[budget].amount
    )
      return false;
    return true;
  };

  render() {
    let validated = this.getValidationState();
    return (
      <div>
        <Button bsStyle="primary" onClick={this.handleShow}>
          Enter Transaction
        </Button>
        <Modal show={this.state.show} onHide={this.handleHide}>
          <Modal.Header>
            <Modal.Title>Enter Transaction</Modal.Title>
          </Modal.Header>
          <form className="Transaction-form" onSubmit={this.handleSubmit}>
            <FormGroup controlId="budgetSelect">
              <ControlLabel>Budget</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                name="budget"
                onChange={this.handleChange}
              >
                <option value="select">Select</option>
                {this.state.budgets.map((budget, idx) => (
                  <option value={idx} key={budget.id}>
                    {budget.name} ($
                    {budget.amount} available)
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <FieldGroup
              id="formControlsEmail"
              name="amount"
              type="number"
              label="Amount"
              placeholder="Enter amount"
              inputAddon="$"
              onChange={this.handleChange}
            />
            <FormGroup controlId="categorySelect">
              <ControlLabel>Category</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                name="category"
                onChange={this.handleChange}
              >
                <option value="select">Select</option>
                <option value="business services">Business Services</option>
                <option value="education">Education</option>
                <option value="entertainment">Entertainment</option>
                <option value="fees/charges">Fees & Charges</option>
                <option value="financial">Financial</option>
                <option value="food">Food</option>
                <option value="gifts/donations">Gifts & Donations</option>
                <option value="health/fitness">Health & Fitness</option>
                <option value="home">Home</option>
                <option value="income">Income</option>
                <option value="investments">Investments</option>
                <option value="kids">Kids</option>
                <option value="loans">Loans</option>
                <option value="personal care">Personal Care</option>
                <option value="pets">Pets</option>
                <option value="shopping">Shopping</option>
                <option value="taxes">Taxes</option>
                <option value="transfer">Transfer</option>
                <option value="travel">Travel</option>
                <option value="uncategorized">Uncategorized</option>
                <option value="other">Other</option>
              </FormControl>
            </FormGroup>
          </form>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Cancel</Button>
            <Button
              onClick={this.handleSubmit}
              bsStyle="primary"
              disabled={validated}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
