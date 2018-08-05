import React from 'react';
import {
  FormGroup,
  FormControl,
  InputGroup,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';

export default function FieldGroup({ id, label, help, inputAddon, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      {inputAddon ? (
        <InputGroup>
          <InputGroup.Addon>{inputAddon}</InputGroup.Addon>
          <FormControl {...props} />
        </InputGroup>
      ) : (
        <FormControl {...props} />
      )}
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
