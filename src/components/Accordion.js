import React, { Component } from 'react';
import {
  Accordion as AccordionWrapper,
  AccordionPanel,
  Button,
  Dropdown,
  DropdownTrigger,
} from '@salesforce/design-system-react';

import { ALL_COMPONENTS, ALL_LABELS } from '../redux/constants';

class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedPanels: {},
    };
    this.togglePanel = this.togglePanel.bind(this)
  }

  togglePanel(event, id) {
    this.setState((state) => ({
      ...state,
      expandedPanels: {
        ...state.expandedPanels,
        [id]: !state.expandedPanels[id],
      },
    }));
  }

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
      <AccordionPanel
        expanded={!!this.state.expandedPanels[`${this.props.id}-${panelIndex}`]}
        id={`${this.props.id}-${panelIndex}`}
        key={`${this.props.id}-${panelIndex}`}
        label={label}
        onTogglePanel={(event) => this.togglePanel(event, `${this.props.id}-${panelIndex}`)}
        summary={label}
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
      </AccordionPanel>
    );
  }


  render() {
    return (
      <AccordionWrapper id={this.props.id} className={`white-bkgd ${this.props.className}`}>
        {ALL_LABELS.map((label, i) => this.renderPanel(label, i))}
      </AccordionWrapper>
    );
  }
}

export default Accordion;
