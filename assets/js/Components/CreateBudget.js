import React, { Component } from 'react';
import {
  Button,
  Modal,
  FormControl,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';
import axios from 'axios';

import FieldGroup from './FieldGroup';

export default class CreateBudget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(JSON.stringify(this.state));
    axios
      .post('http://localhost:4000/api/budgets', {
        headers: { 'Content-Type': 'application/json' },
        budget: {
          name: this.state.name,
          amount: this.state.amount,
          category: this.state.category
        }
      })
      .then(res => {
        console.log(res);
        this.props.refreshBudgets();
        this.handleHide();
      })
      .catch(err => console.log(err));
  };

  handleShow = () => this.setState({ show: true });

  handleHide = () => this.setState({ show: false });

  getValidationState = () => {
    const { name, amount, category } = this.state;
    if (name && amount > 0 && category) return false;
    return true;
  };

  render() {
    let validated = this.getValidationState();
    return (
      <div>
        <Button bsStyle="primary" onClick={this.handleShow}>
          {this.state.create ? 'Cancel' : 'Create Budget'}
        </Button>
        <Modal show={this.state.show} onHide={this.handleHide}>
          <Modal.Header>
            <Modal.Title>Create Budget</Modal.Title>
          </Modal.Header>
          <form className="Budget-form" onSubmit={this.handleSubmit}>
            <FieldGroup
              id="formControlsName"
              name="name"
              type="text"
              label="Name"
              placeholder="Enter name"
              onChange={this.handleChange}
            />
            <FieldGroup
              id="formControlsAmount"
              name="amount"
              type="number"
              label="Amount"
              placeholder="Enter amount"
              inputAddon="$"
              onChange={this.handleChange}
            />
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Category</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                name="category"
                onChange={this.handleChange}
              >
                <option value="select">Select</option>
                <option value="rental">Car Rental</option>
                <option value="entertainment">Entertainment</option>
                <option value="flight">Flight</option>
                <option value="food">Food</option>
                <option value="fuel">Fuel</option>
                <option value="lodging">Lodging</option>
                <option value="maintenance">Maintenance</option>
                <option value="marketing">Marketing</option>
                <option value="meetings">Meetings</option>
                <option value="other">Other</option>
                <option value="shipping">Shipping</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="telecom">Telecom</option>
              </FormControl>
            </FormGroup>
          </form>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Cancel</Button>
            <Button
              onClick={this.handleSubmit}
              type="submit"
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
