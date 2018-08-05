import React, { Component } from 'react';
import {
  Button,
  Modal,
  FormControl,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';

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
    console.log(e);
  };

  handleShow = () => this.setState({ show: true });

  handleHide = () => this.setState({ show: false });

  render() {
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
              id="formControlsText"
              type="text"
              label="Name"
              placeholder="Enter name"
            />
            <FieldGroup
              id="formControlsEmail"
              type="number"
              label="Amount"
              placeholder="Enter amount"
              inputAddon="$"
            />
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Category</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
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
            <Button type="submit" bsStyle="primary" disabled={false}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
