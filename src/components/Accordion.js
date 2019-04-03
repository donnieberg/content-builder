import React, { Component } from 'react';
import {
  Accordion as AccordionWrapper,
  AccordionPanel
} from '@salesforce/design-system-react';

// const accordionItems = [
//   {
//     id: '1',
//     summary: 'Accordion Summary',
//     details: 'Accordion details - A',
//   },
//   {
//     id: '2',
//     summary: 'Accordion Summary',
//     details: 'Accordion details - B',
//   },
//   {
//     id: '3',
//     summary: 'Accordion Summary',
//     details: 'Accordion details - C',
//   },
// ];

class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedPanels: {},
    };
  }

  togglePanel(event, data) {
    this.setState((state) => ({
      ...state,
      expandedPanels: {
        ...state.expandedPanels,
        [data.id]: !state.expandedPanels[data.id],
      },
    }));
  }

  render() {
    return (
      <AccordionWrapper id="base-example-accordion" className="white-bkgd">
        {this.props.children.map((item, i) => (
          <AccordionPanel
            expanded={!!this.state.expandedPanels[item.id]}
            id={item.id}
            key={item.id}
            onTogglePanel={(event) => this.togglePanel(event, item)}
            summary={item.label}
          >
            {item.content}
          </AccordionPanel>
        ))}
      </AccordionWrapper>
    );
  }
}

export default Accordion;
