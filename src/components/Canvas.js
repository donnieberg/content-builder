import React, { Component } from 'react';
import {
  Button,
  Dropdown,
  DropdownTrigger,
} from '@salesforce/design-system-react';
import classnames from 'classnames';

import { ALL_COMPONENTS } from '../redux/constants';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
  }

  handleKeyEvent = (event) => {
    if (event.key === ' ') {
      this.handleSpaceKey(event);
    }
  }

  handleSpaceKey(event) {
    console.log(event.key);
  }

  renderComponents(region, components) {
    if (components.length === 0) {
      return (
        <Dropdown
          align="left"
          className="wi-full"
          options={ALL_COMPONENTS}
        // onSelect={(e) => {
        //   this.props.addComponent(region, e.value);
        // }}
        >
          <DropdownTrigger>
            <Button label={`Add a Component: ${region} Region`} />
          </DropdownTrigger>
        </Dropdown>
      );
    } else {
      return (
        components.map((componentData, i) => {
          if (typeof (componentData.component) === 'string') {
            return (
              <div
                className={classnames("mbs bg-gray pal",
                  {
                    "grabbed": componentData.isGrabbed,
                  }
                )}
                id={componentData.id}
                key={componentData.id}
                tabIndex="0"
                onKeyDown={this.handleKeyEvent}
              >
                {componentData.label}
              </div>
            );
          } else {
            const ReactComponent = componentData.component;
            return (
              <ReactComponent
                id={componentData.id}
                className="mbs"
                children={componentData.children}
                key={`component-${i}`}
                addComponent={this.props.addComponent}
                region={region}
              // onKeyDown={this.handleKeyEvent}
              />
            )
          }
        })
      )
    }
  }

  render() {
    return (
      <div id="main-builder" className="maxs mbn pam pbn bg-blue dg builder-grid dg-stretch">
        {
          Object.keys(this.props.data).map((region, i) => {
            return (
              <section
                id={`builder-${region}`}
                className="builder-region slds-text-align_center"
                aria-labelledby={`builder-${region}-header`}
                key={i}
              >
                <h2 className="slds-assistive-text">{region} region</h2>
                <div className="mal" id={`builder-${region}-components`}>
                  {this.renderComponents(region, this.props.data[region].components)}
                </div>
              </section>
            );
          })
        }
      </div>
    );
  }
}

export default Canvas;
