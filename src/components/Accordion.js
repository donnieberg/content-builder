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

  render() {
    return (
      <AccordionWrapper id={this.props.id} className={`white-bkgd ${this.props.className}`}>
        {this.props.children.map((item, i) => (
          <AccordionPanel
            expanded={!!this.state.expandedPanels[`${this.props.id}-${i}`]}
            id={`${this.props.id}-${i}`}
            key={`${this.props.id}-${i}`}
            onTogglePanel={(event) => this.togglePanel(event, `${this.props.id}-${i}`)}
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
