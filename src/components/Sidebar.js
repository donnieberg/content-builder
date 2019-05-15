import React, { Component } from 'react';
import { Button, Icon } from '@salesforce/design-system-react';

import { ALL_COMPONENTS } from '../redux/constants';
import { getNewIndex } from '../helpers';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { currIndex: 0 };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let currComponent = ALL_COMPONENTS[this.state.currIndex];
    if (prevState.currIndex !== this.state.currIndex) {
      document.getElementById(currComponent.id).focus();
    }
  }

  handleKeyDown(event) {
    let newIndex = this.state.currIndex;
    if (event.key === 'ArrowDown') newIndex = getNewIndex(ALL_COMPONENTS, this.state.currIndex, 'add');
    else if (event.key === 'ArrowUp') newIndex = getNewIndex(ALL_COMPONENTS, this.state.currIndex, 'sub');
    this.setState({ currIndex: newIndex });
  }

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
                    onKeyDown={this.handleKeyDown}
                    onClick={() => {
                      this.props.handleStartDrag(component.id)
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
