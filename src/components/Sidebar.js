import React, { Component } from 'react';
import { Button, Icon } from '@salesforce/design-system-react';

import { ALL_COMPONENTS } from '../redux/constants';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currIndex: 0,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate() {
    let currComponent = ALL_COMPONENTS[this.state.currIndex];
    document.getElementById(currComponent.id).focus();
  }

  handleKeyDown(event) {
    let newIndex = this.state.currIndex;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      newIndex++;
      if (newIndex > ALL_COMPONENTS.length - 1) newIndex = ALL_COMPONENTS.length - 1;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      newIndex--;
      if (newIndex < 0) newIndex = 0;
    }
    this.setState({ currIndex: newIndex });
  }

  render() {
    return (
      <div id="components-sidebar" className="pam bg-white bas border-gray">
        <h2 className="mbs slds-text-heading_small">Lightning Components</h2>
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
                    onKeyDown={this.handleKeyDown}
                    onClick={() => {
                      this.handleStartDrag(component.id)
                    }}
                    variant="base"
                    id={component.id}
                    tabIndex={i === this.state.currIndex ? "0" : "-1"}
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
