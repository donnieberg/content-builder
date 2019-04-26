import React, { Component } from 'react';
import { Button } from '@salesforce/design-system-react';
import uniqid from 'uniqid';

import { connect } from 'react-redux';
import { addComponent } from './redux/actions';
import { ALL_COMPONENTS } from './redux/constants';

import Canvas from './components/Canvas';
import Header from './components/Header';

import './App.css';

const mapStateToProps = state => {
  return {
    canvas: state.canvas,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addComponent: (componentData, canvasRegion) => dispatch(addComponent(componentData, canvasRegion)),
  };
}

class ConnectedApp extends Component {
  constructor(props) {
    super(props);

    const initAllComponents = Object.assign({}, this.props.canvas);

    this.state = {
      allComponents: initAllComponents,
      grabbedComponent: null,
      isDragDropMode: false,
      grabbedComponentIndex: 0,
      grabbedComponentType: null,
      grabbedComponentCurrRegion: 'header'
    }

    this.addComponent = this.addComponent.bind(this);
    this.handleStartDrag = this.handleStartDrag.bind(this);
  }

  addComponent(region, componentType, componentIndex = 0, parentComponentId = null, panelIndex = -1) {
    const cmp = ALL_COMPONENTS.find(x => x.id === componentType);
    let componentToAdd = Object.assign({}, cmp);

    componentToAdd.id = uniqid();
    let regionDataCopy = Object.assign({}, this.props.canvas[region]);

    if (panelIndex > -1) {
      let parentComponentData = regionDataCopy.components.find(x => x.id === parentComponentId);
      componentToAdd.panelIndex = panelIndex;
      parentComponentData.children.push(componentToAdd);
    } else regionDataCopy.components.splice(componentIndex, 0, componentToAdd);

    this.props.addComponent(region, regionDataCopy);
  }

  handleStartDrag(componentType) {
    let updatedAllComponents = Object.assign({}, this.props.canvas);

    // can only have one grabbed component at a time
    // if one is already grabbed, drop it where it currently is & save in redux
    if (this.state.grabbedComponent !== null) {
      this.addComponent(
        this.state.grabbedComponentCurrRegion,
        this.state.grabbedComponentType,
        this.state.grabbedComponentIndex
      );

      // removes existing grabbed component from updatedAllComponents
      let updatingRegion = updatedAllComponents[this.state.grabbedComponentCurrRegion].components;
      let prevGrabbedComponentIndex = updatingRegion.findIndex(x => x.isGrabbed === true);
      updatingRegion.splice(prevGrabbedComponentIndex, 1);

      this.setState({
        grabbedComponentIndex: 0,
        grabbedComponentCurrRegion: 'header',
      });
    }

    // the new grabbed component
    // had to mess around with referencing a lot - I KEPT OVERWRITING THINGS ON ACCIDENT
    let cmp = ALL_COMPONENTS.find(x => x.id === componentType);
    let componentToAdd = Object.assign({}, cmp);
    componentToAdd.isGrabbed = true;
    componentToAdd.id = `floating-${componentType}`;

    // adds new grabbed component to updatedAllComponents
    updatedAllComponents['header'].components.splice(0, 0, componentToAdd);

    this.setState({
      allComponents: updatedAllComponents,
      isDragDropMode: true,
      grabbedComponent: componentToAdd,
      grabbedComponentType: componentType,
    });
  }

  renderSidebarButtons() {
    return (
      <ul>
        {
          ALL_COMPONENTS.map((component) => {
            return (
              <li className="mbs" key={component.id}>
                <Button
                  iconCategory={component.rightIcon.category}
                  iconName={component.rightIcon.name}
                  iconPosition="left"
                  label={component.label}
                  onClick={() => {
                    this.handleStartDrag(component.id)
                  }}
                  variant="base"
                  id={component.id}
                />
              </li>
            )
          })
        }
      </ul>
    );
  }

  render() {
    return (
      <div className="App ht-full dg app-grid bg-gray">
        <Header />
        <main className="dg main-grid dg-stretch">
          <div id="components-sidebar" className="pam bg-white bas border-gray">
            <h2 className="mbs slds-text-heading_small">Lightning Components</h2>
            {this.renderSidebarButtons()}
          </div>
          <Canvas
            data={this.state.allComponents}
            addomponent={this.addComponent}
            isDragDropMode={this.state.isDragDropMode}
          />
          <div id="properties-sidebar" className="pam bg-white bas border-gray">
            <h2 className="slds-text-heading_small">Properties</h2>
          </div>
        </main>
      </div>
    );
  }
}

// connects react component to the redux store
const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);
export default App;
