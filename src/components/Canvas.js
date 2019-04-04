import React, { Component } from 'react';

import classnames from 'classnames';
import {
  Button,
  // ButtonGroup,
  Dropdown,
  DropdownTrigger,
  // Icon,
} from '@salesforce/design-system-react';

import Accordion from './Accordion';
import Tabs from './Tabs';

const addComponentOptions = [
  {
    label: 'Tabs',
    value: 'tabs',
    rightIcon: {
      category: 'utility',
      name: 'tabset'
    }
  },
  {
    label: 'Accordion',
    value: 'accordion',
    rightIcon: {
      category: 'utility',
      name: 'layers'
    }
  },
  {
    label: 'Chatter',
    value: 'Chatter',
    rightIcon: {
      category: 'utility',
      name: 'chat'
    }
  },
];

class Canvas extends Component {
  renderComponents() {
    return (
      this.props.data.header.components.map((componentData, i) => {
        if(typeof(componentData.component) === 'string') {
          return <div key={`static-${i}`}>{componentData.component}</div>
          } else {
            let ReactComponent = componentData.component;
            return (
              <ReactComponent children={componentData.children} key={`component-{i}`} />
              )
          }
      })
    )
  }

  render() {

    return (
      <div id="main-builder" className="maxs mbn pam pbn bg-blue dg builder-grid dg-stretch">
        {/* <h2 className="slds-assistive-text"></h2> */}
        <div
          id="builder-header"
          className="builder-region slds-text-align_center"
          aria-label="Header Region"
        >
          <div className="mal">
            {this.renderComponents()}
            <Dropdown
              align="left"
              className="wi-full"
              options={addComponentOptions}
            >
              <DropdownTrigger>
                <Button label="Add a Component: Header Region" />
              </DropdownTrigger>
            </Dropdown>
          </div>
        </div>
        <div
          id="builder-main-col"
          className="builder-region slds-text-align_center"
          aria-label="Main Region"
        >
          <div className="mal">
            {/* <Tabs data={this.props.data[0]} /> */}
            <Dropdown
              align="left"
              className="wi-full"
              options={addComponentOptions}
            >
              <DropdownTrigger>
                <Button label="Add a Component: Main Region" />
              </DropdownTrigger>
            </Dropdown>
          </div>
        </div>
        <div
          id="builder-small-col"
          className="builder-region slds-text-align_center"
          aria-label="Right Sidebar Region"
        >
          <div className="mal">
            {/* <Accordion data={this.props.data[1]} /> */}
            <Dropdown
              align="left"
              className="wi-full"
              options={addComponentOptions}
            >
              <DropdownTrigger>
                <Button label="Add a Component: Right Sidebar" />
              </DropdownTrigger>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default Canvas;
