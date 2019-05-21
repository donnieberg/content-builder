import React, { Component } from 'react';

// import { renderComponent } from '../helpers';
import CanvasComponent from './CanvasComponent';
import AddCompButton from './AddCompButton';

class Canvas extends Component {
  renderComponents(region, components) {
    if (components.length === 0) {
      return (
        <AddCompButton
          addComponent={this.props.addComponent}
          id={this.props.id}
          label={`Add a Component: ${region} Region`}
          region={this.props.region}
        />
      );
    } else {
      return (
        components.map((componentData) => {
          if (componentData !== undefined || componentData !== null) {
            return <CanvasComponent
              componentData={componentData}
              region={this.props.region}
              handleKeyDown={this.props.handleKeyDown}
              handleStartDrag={this.props.handleStartDrag}
            />
          }
          return null;
        })
      )
    }
  }

  render() {
    return (
      <div id="main-builder" className="maxs mbn pam pbn bg-blue dg builder-grid dg-stretch">
        {
          Object.keys(this.props.data).map((region, i) => {
            return (
              <section
                id={this.props.canvasRegions[i]}
                className="builder-region slds-text-align_center"
                aria-labelledby={`builder-${region}-header`}
                key={i}
              >
                <h2 className="slds-assistive-text">{region} region</h2>
                <div className="mal" id={`builder-${region}-components`}>
                  {this.renderComponents(region, this.props.data[region].components)}
                </div>
              </section>
            );
          })
        }
      </div>
    );
  }
}

export default Canvas;
