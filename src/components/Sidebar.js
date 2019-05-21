import React, { Component } from 'react';
import { Button, Icon } from '@salesforce/design-system-react';

import { ALL_COMPONENTS } from '../redux/constants';

class Sidebar extends Component {
  render() {
    return (
      <div 
        id="components-sidebar" 
        className="pam bg-white bas border-gray"
        ref={this.props.sidebarRef}
        tabIndex="-1"
      >
        <h2 className="mbm slds-text-heading_large">Lightning Components</h2>
        <ul>
          {
            ALL_COMPONENTS.map((component, i) => {
              return (
                <li className="mbs df df-justify" key={component.id}>
                  <Button
                    iconCategory={component.rightIcon.category}
                    iconName={component.rightIcon.name}
                    iconPosition="left"
                    label={component.label}
                    onClick={() => {
                      this.props.handleStartDrag(component.id)
                    }}
                    variant="base"
                    id={component.id}
                  />
                  <div>
                    <Icon
                      assistiveText={{ label: 'Desktop Compatible' }}
                      category="utility"
                      name="desktop"
                      size="x-small"
                    />
                    <Icon
                      assistiveText={{ label: 'Mobile Compatible' }}
                      category="utility"
                      name="phone_portrait"
                      size="x-small"
                    />
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Sidebar;
