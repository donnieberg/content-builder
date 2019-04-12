import React, { Component } from 'react';
import {
  Button,
  Dropdown,
  DropdownTrigger,
  Tabs as TabsWrapper,
  TabsPanel
} from '@salesforce/design-system-react'

import { ALL_COMPONENTS, ALL_LABELS } from '../redux/constants';

class Tabs extends Component {
  renderComponent(componentData) {
    if (typeof (componentData.component) === 'string') {
      return (
        <div
          className="mbs bg-gray pal"
          id={componentData.id}
          key={componentData.id}
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
          key={componentData.id}
          addComponent={this.props.addComponent}
          region={this.props.region}
        />
      )
    }
  }

  renderPanel(label, panelIndex) {
    const panelComponents = this.props.children.filter(component => component.panelIndex === panelIndex);

    return (
      <TabsPanel
        id={`${this.props.id}-${panelIndex}`}
        key={`${this.props.id}-${panelIndex}`}
        label={label}
      >
        {
          panelComponents.length === 0 ?
            <Dropdown
              align="left"
              className="wi-full"
              options={ALL_COMPONENTS}
              onSelect={(e) => {
                this.props.addComponent(this.props.region, e.value, this.props.id, panelIndex);
              }}
            >
              <DropdownTrigger>
                <Button label={`Add a Component: Tabs Panel ${panelIndex + 1}`} />
              </DropdownTrigger>
            </Dropdown> : <div>
              {
                panelComponents.map((componentData, i) => (
                  this.renderComponent(componentData)
                ))
              }
            </div>
        }
      </TabsPanel>
    );
  }

  render() {
    return (
      <TabsWrapper className={this.props.className}>
        {ALL_LABELS.map((label, i) => this.renderPanel(label, i))}
      </TabsWrapper>
    );
  }
}

export default Tabs;
