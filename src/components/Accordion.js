import React, { Component, Fragment } from 'react';
import { Accordion as AccordionWrapper, AccordionPanel } from '@salesforce/design-system-react';

import AddCompButton from './AddCompButton';
import CanvasComponent from './CanvasComponent';

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

  renderPanel(panel) {
    return (
      <AccordionPanel
        expanded={!!this.state.expandedPanels[`${this.props.id}-${panel.index}`]}
        id={`${this.props.id}-${panel.index}`}
        key={`${this.props.id}-${panel.index}`}
        label={panel.name}
        onTogglePanel={(event) => this.togglePanel(event, `${this.props.id}-${panel.index}`)}
        summary={panel.name}
      >
        {
          panel.components.length === 0 ?
            <AddCompButton
              handleStartDrag={this.props.handleStartDrag}
              id={this.props.id}
              label={`Add a Component: ${panel.name}`}
              panelIndex={panel.index}
              region={this.props.region}
              parentId={this.props.id}
            /> : <Fragment>
              {
                panel.components.map((componentData, i) => (
                  <CanvasComponent
                    className="child-component"
                    componentData={componentData}
                    region={this.props.region}
                    handleKeyDown={this.props.handleKeyDown}
                    handleStartDrag={this.props.handleStartDrag}
                    panelIndex={panel.index}
                    parentId={this.props.id}
                  />
                ))
              }
            </Fragment>
        }
      </AccordionPanel>
    );
  }


  render() {
    return (
      <AccordionWrapper id={this.props.id} className={`white-bkgd ${this.props.className}`}>
        {this.props.panels.map((panel) => this.renderPanel(panel))}
      </AccordionWrapper>
    );
  }
}

export default Accordion;
