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
        onSelect={(event) => {
          this.props.handleStartDrag(
            event.value,
            null,
            this.props.panelIndex,
            this.props.region,
            this.props.parentId,
          );
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
