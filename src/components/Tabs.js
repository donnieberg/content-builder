import React, { Component } from 'react';
import {
  Button,
  Dropdown,
  DropdownTrigger,
  Tabs as TabsWrapper,
  TabsPanel
} from '@salesforce/design-system-react'

import { ALL_COMPONENTS } from '../redux/constants';

class Tabs extends Component {
  render() {
    return (
      <TabsWrapper className={this.props.className}>
        {
          this.props.children.map((item, i) => (
            <TabsPanel
              id={`${item.id}-${i}`}
              key={`${item.id}-${i}`}
              label={item.label}
            >
              {
                item.content === null ?
                  <Dropdown
                    align="left"
                    className="wi-full"
                    options={ALL_COMPONENTS}
                    onSelect={(e) => {
                      // this.props.addComponent(region, e.value);
                    }}
                  >
                    <DropdownTrigger>
                      <Button label={`Add a Component`} />
                      {/* <Button label={`Add a Component: ${region} Region`} /> */}
                    </DropdownTrigger>
                  </Dropdown > : item.content
              }
            </TabsPanel>
          ))
        }
      </TabsWrapper>
    );
  }
}

export default Tabs;
