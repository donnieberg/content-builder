import React, { Component } from 'react';
import { Button, Icon } from '@salesforce/design-system-react';

class Properties extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 className="mbm slds-text-heading_large">Properties</h2>
        <img src="./images/stencil_inputs.png" alt="stencil for fake property fields" />
        <img src="./images/stencil_formFields.png" alt="stencil for fake property fields" />
        <img src="./images/stencil_formFields.png" alt="stencil for fake property fields" />
      </div>
    );
  }
}

export default Properties;
