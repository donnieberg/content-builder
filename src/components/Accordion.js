import React, { Component } from 'react';
import {
  Accordion as AccordionWrapper,
  AccordionPanel
} from '@salesforce/design-system-react';

class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedPanels: {},
      items: [
        {
          id: '1',
          summary: 'Accordion Summary',
          details: 'Accordion details - A',
        },
        {
          id: '2',
          summary: 'Accordion Summary',
          details: 'Accordion details - B',
        },
        {
          id: '3',
          summary: 'Accordion Summary',
          details: 'Accordion details - C',
        },
      ],
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
    if (this.props.action) {
      const dataAsArray = Object.keys(data).map((id) => data[id]);
      this.props.action('onClick')(event, ...dataAsArray);
    } else if (console) {
      console.log('[onSelect] (event, data)', event, data);
    }
  }

  render() {
    return (
      <AccordionWrapper id="base-example-accordion" className="white-bkgd">
        {this.state.items.map((item, i) => (
          <AccordionPanel
            expanded={!!this.state.expandedPanels[item.id]}
            id={item.id}
            key={item.id}
            onTogglePanel={(event) => this.togglePanel(event, item)}
            summary={item.summary}
          >
            {item.details}
          </AccordionPanel>
        ))}
      </AccordionWrapper>
    );
  }
}

export default Accordion;