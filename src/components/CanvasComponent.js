import React, { Component } from 'react';
import classnames from 'classnames';
import { Button, ButtonGroup } from '@salesforce/design-system-react';

class CanvasComponent extends Component {
  renderStaticComponent() {
    return (
      <div
        className={classnames("component",
          {
            "grabbed": this.props.componentData.isGrabbed,
          }
        )}
        id={this.props.componentData.id}
        key={this.props.componentData.id}
        tabIndex="0"
        onKeyDown={(event) => {
          this.props.handleKeyDown(event, this.props.panelIndex)
        }}
        data-type={this.props.componentData.value}
      >
        <ButtonGroup className="">
          <Button
            assistiveText={{ icon: `Grab ${this.props.componentData.label}` }}
            iconCategory="utility"
            iconName="rows"
            onClick={(event) => {
              this.props.handleStartDrag(this.props.componentData.value, event, this.props.panelIndex);
            }}
          />
          <Button
            assistiveText={{ icon: `Delete ${this.props.componentData.label}` }}
            iconCategory="utility"
            iconName="delete"
          />
        </ButtonGroup>
        <div
          className="mbs bg-gray pal"
        >
          {this.props.componentData.label}
        </div>
      </div>
    );
  }

  renderReactComponent() {
    const ReactComponent = this.props.componentData.component;
    return (
      <div
        className={classnames("component", "parent-component",
          {
            "grabbed": this.props.componentData.isGrabbed,
          }
        )}
        data-type={this.props.componentData.value}
        id={this.props.componentData.id}
        key={`component-${this.props.componentData.id}`}
        onKeyDown={(event) => {
          this.props.handleKeyDown(event, this.props.panelIndex)
        }}
        tabIndex="0"
      >
        <ButtonGroup className="">
          <Button
            assistiveText={{ icon: `Grab ${this.props.componentData.label}` }}
            iconCategory="utility"
            iconName="rows"
            onClick={(event) => {
              this.props.shandleStartDrag(this.props.componentData.value, event, this.props.panelIndex);
            }}
          />
          <Button
            assistiveText={{ icon: `Delete ${this.props.componentData.label}` }}
            iconCategory="utility"
            iconName="delete"
          />
        </ButtonGroup>
        <ReactComponent
          addComponent={this.props.addComponent}
          children={this.props.componentData.children}
          className="mbs"
          handleKeyDown={this.props.handleKeyDown}
          handleStartDrag={this.props.handleStartDrag}
          id={`${this.props.componentData.id}`}
          region={this.props.region}
        />
      </div>
    );
  }


  render() {
    if (typeof (this.props.componentData.component) === 'string') return this.renderStaticComponent();
    else return this.renderReactComponent();
  }
}

export default CanvasComponent;
