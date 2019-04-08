import React, { Component } from 'react';
import {
  Button,
  // ButtonGroup,
  Dropdown,
  DropdownTrigger,
  // Icon,
} from '@salesforce/design-system-react';

import { ALL_COMPONENTS } from '../redux/constants';

class Canvas extends Component {
  renderComponents(region, components) {
    if (components.length === 0) {


      return (
        <Dropdown
          align="left"
          className="wi-full"
          options={ALL_COMPONENTS}
        >
          <DropdownTrigger>
            <Button label={`Add a Component: ${region} Region`} />
          </DropdownTrigger>
        </Dropdown >
      );
    } else {
      return (
        components.map((componentData, i) => {
          if (typeof (componentData.component) === 'string') {
            return <div className="mbs bg-gray pal" key={`static-${i}`}>{componentData.component}</div>
          } else {
            let ReactComponent = componentData.component;
            return (
              <ReactComponent id={componentData.id} className="mbs" children={componentData.children} key={`component-${i}`} />
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
                <div className="mal">
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
