import React, { Component, Fragment } from 'react';
import { Accordion as AccordionWrapper, AccordionPanel } from '@salesforce/design-system-react';

import AddCompButton from './AddCompButton';
import CanvasComponent from './CanvasComponent';

import { ALL_LABELS } from '../redux/constants';

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
            <AddCompButton
              addComponent={this.props.addComponent}
              id={this.props.id}
              label={`Add a Component: Accordion Panel ${panelIndex + 1}`}
              panelIndex={panelIndex}
              region={this.props.region}
            /> : <Fragment>
              {
                panelComponents.map((componentData, i) => (
                  <CanvasComponent
                    className="child-component"
                    componentData={componentData}
                    region={this.props.region}
                    handleKeyDown={this.props.handleKeyDown}
                    handleStartDrag={this.props.handleStartDrag}
                    panelIndex={panelIndex}
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
        {ALL_LABELS.map((label, i) => this.renderPanel(label, i))}
      </AccordionWrapper>
    );
  }
}

export default Accordion;
