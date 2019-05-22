import React, { Component, Fragment } from 'react';
import { Tabs as TabsWrapper, TabsPanel } from '@salesforce/design-system-react';

import AddCompButton from './AddCompButton';
import CanvasComponent from './CanvasComponent';

import { ALL_LABELS } from '../redux/constants';

class Tabs extends Component {
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
            <AddCompButton
              addComponent={this.props.addComponent}
              id={this.props.id}
              label={`Add a Component: Tabs Panel ${panelIndex + 1}`}
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
