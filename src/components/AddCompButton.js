import React, { Component } from 'react';
import {
  Button,
  Dropdown,
  DropdownTrigger,
} from '@salesforce/design-system-react';

import { ALL_COMPONENTS } from '../redux/constants';

class AddCompButton extends Component {
  render() {
    return (
      <Dropdown
        align="left"
        className="wi-full"
        options={ALL_COMPONENTS}
        onSelect={(e) => {
          this.props.addComponent(this.props.region, e.value, 0, this.props.id, this.props.panelIndex);
        }}
      >
        <DropdownTrigger>
          <Button label={this.props.label} />
        </DropdownTrigger>
      </Dropdown>
    );
  }
}

export default AddCompButton;