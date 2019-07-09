import React, { Component, Fragment } from 'react';
import { Tabs as TabsWrapper, TabsPanel } from '@salesforce/design-system-react';

import AddCompButton from './AddCompButton';
import CanvasComponent from './CanvasComponent';

class Tabs extends Component {
  renderPanel(panel) {
    return (
      <TabsPanel
        id={`${this.props.id}-${panel.index}`}
        key={`${this.props.id}-${panel.index}`}
        label={panel.name}
      >
        {
          panel.components.length === 0 ?
            <AddCompButton
              // handleStartDrag={this.props.handleStartDrag}
              handleNewComponent={this.props.handleNewComponent}
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
                    key={`tcomp-${componentData.id}`}
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
        {this.props.panels.map((panel) => this.renderPanel(panel))}
      </TabsWrapper>
    );
  }
}

export default Tabs;
