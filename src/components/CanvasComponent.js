import React, { Component } from 'react';
import classnames from 'classnames';
import { Button } from '@salesforce/design-system-react';

class CanvasComponent extends Component {
  renderStaticComponent() {
    return (
      <div className="bam border-blue">
        <img
          src={`./images/${this.props.componentData.imageSrc}`}
          alt={`placeholder stencil for ${this.props.componentData.label}`}
        />
      </div>
    );
  }

  renderReactComponent() {
    const ReactComponent = this.props.componentData.component;
    return (
      <ReactComponent
        addComponent={this.props.addComponent}
        panels={this.props.componentData.panels}
        className="mbs"
        handleKeyDown={this.props.handleKeyDown}
        handleNewComponent={this.props.handleNewComponent}
        handleStartDrag={this.props.handleStartDrag}
        id={`${this.props.componentData.id}`}
        region={this.props.region}
      />
    );
  }


  render() {
    const isReactComponent = !(typeof (this.props.componentData.component) === 'string');
    return (
      <div
        className={classnames("component pos-rel", this.props.className,
          {
            "parent-component": isReactComponent,
            "grabbed": this.props.componentData.isGrabbed,
          }
        )}
        id={this.props.componentData.id}
        key={`component-${this.props.componentData.id}`}
        tabIndex="0"
        onKeyDown={this.props.handleKeyDown}
        data-type={this.props.componentData.value}
        data-panelindex={this.props.panelIndex}
      >
        <div className="pas pos-abs right-0 z-above">
          <Button
            assistiveText={{ icon: `Grab ${this.props.componentData.label}` }}
            className="cmp-action-btn bg-white mrs"
            iconCategory="utility"
            iconName="rows"
            iconVariant="border"
            onClick={this.props.handleStartDrag}
            variant="icon"
            disabled
          />
          <Button
            assistiveText={{ icon: `Delete ${this.props.componentData.label}` }}
            className="cmp-action-btn bg-white mrs"
            iconCategory="utility"
            iconName="delete"
            iconVariant="border"
            variant="icon"
          />

        </div>
        {
          isReactComponent ?
            this.renderReactComponent() : this.renderStaticComponent()
        }
      </div>
    )
  }
}

export default CanvasComponent;
