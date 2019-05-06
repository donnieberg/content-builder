import React, { Component } from 'react';


import uniqid from 'uniqid';

import { connect } from 'react-redux';
import { updateRegion } from './redux/actions';
import { ALL_COMPONENTS } from './redux/constants';

import Canvas from './components/Canvas';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import './App.css';

const mapStateToProps = state => {
  return {
    canvas: state.canvas,
    canvasRegions: state.canvasRegions,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateRegion: (region, regionData) => dispatch(updateRegion(region, regionData)),
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
      currFocusedElement: null,
      grabbedComponentIndex: 0,
      grabbedComponentType: null,
      grabbedComponentCurrRegion: 'header'
    }

    this.addComponent = this.addComponent.bind(this);
    this.handleStartDrag = this.handleStartDrag.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currFocusedElement !== null && prevState.currFocusedElement !== this.state.currFocusedElement) {
      document.getElementById(this.state.currFocusedElement).focus();
    }
  }

  addComponent(region, componentType, componentIndex = 0, parentComponentId = null, panelIndex = -1) {
    const cmp = ALL_COMPONENTS.find(x => x.id === componentType);
    let componentToAdd;

    if (this.state.grabbedComponent === null) componentToAdd = Object.assign({}, cmp);
    else {
      componentToAdd = Object.assign({}, this.state.grabbedComponent);
      componentToAdd.isGrabbed = false;
    };

    componentToAdd.id = uniqid();
    let regionDataCopy = Object.assign({}, this.props.canvas[region]);

    if (panelIndex > -1) {
      let parentComponentData = regionDataCopy.components.find(x => x.id === parentComponentId);
      componentToAdd.panelIndex = panelIndex;
      parentComponentData.children.push(componentToAdd);
    } else regionDataCopy.components.splice(componentIndex, 0, componentToAdd);

    this.props.updateRegion(region, regionDataCopy);
    this.setState({ currFocusedElement: componentToAdd.id });

    return componentToAdd.id;
  }

  handleDrop(shouldFocusDroppedComp) {
    let updatedAllComponents = Object.assign({}, this.props.canvas);
    let droppedComponentID = this.addComponent(
      this.state.grabbedComponentCurrRegion,
      this.state.grabbedComponentType,
      this.state.grabbedComponentIndex,
    );

    // removes existing grabbed component from updatedAllComponents
    let updatingRegion = updatedAllComponents[this.state.grabbedComponentCurrRegion].components;
    let prevGrabbedComponentIndex = updatingRegion.findIndex(x => x.isGrabbed === true);
    updatingRegion.splice(prevGrabbedComponentIndex, 1);

    this.setState((prevState) => {
      return {
        allComponents: updatedAllComponents,
        currFocusedElement: shouldFocusDroppedComp ? droppedComponentID : prevState.currFocusedElement,
        grabbedComponent: null,
        grabbedComponentIndex: 0,
        grabbedComponentCurrRegion: 'header',
        isDragDropMode: false,
      }
    });
  }

  handleStartDrag(componentType, event = null) {
    let updatedAllComponents = Object.assign({}, this.props.canvas);
    let newRegion = 'header';
    let componentToAdd;
    let newComponentIndex = 0;

    // can only have one grabbed component at a time - drop currently grabbed thing before grab new one
    if (this.state.grabbedComponent !== null) this.handleDrop();

    // if on a component already in redux, need to remove the component from redux and put it in app state
    if (event !== null) {
      const regionHTML = event.target.closest('section');
      const componentHTML = event.target.closest('div.component')
      newRegion = regionHTML.id.substring(8);

      // gets the existing component & index from redux
      componentToAdd = Object.assign(
        {},
        updatedAllComponents[newRegion].components.find(cmp => cmp.id === componentHTML.id)
      );
      newComponentIndex = updatedAllComponents[newRegion].components.findIndex(cmp => cmp.id === componentHTML.id);

      // removes component from local state and redux state
      updatedAllComponents[newRegion].components.splice(newComponentIndex, 1);
      this.props.updateRegion(newRegion, updatedAllComponents[newRegion]);

      componentType = componentToAdd.value;
    } else {
      // the new grabbed component
      // had to mess around with referencing a lot - I KEPT OVERWRITING THINGS ON ACCIDENT
      let cmp = ALL_COMPONENTS.find(x => x.id === componentType);
      componentToAdd = Object.assign({}, cmp);
    }

    componentToAdd.id = `floating-${componentType}`;
    componentToAdd.isGrabbed = true;


    // adds new grabbed component to updatedAllComponents
    updatedAllComponents[newRegion].components.splice(newComponentIndex, 0, componentToAdd);

    this.setState({
      allComponents: updatedAllComponents,
      currFocusedElement: componentToAdd.id,
      isDragDropMode: true,
      grabbedComponent: componentToAdd,
      grabbedComponentType: componentType,
      grabbedComponentCurrRegion: newRegion,
    });
  }

  handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      if (this.state.grabbedComponent !== null) this.handleDrop(true);
      else this.handleStartDrag(event.target.getAttribute('data-type'), event);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      this.handleRightLeft(event);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      this.handleUpDown(event);
    }
  }

  handleUpDown(event) {
    event.preventDefault();
    let updatedAllComponents = Object.assign({}, this.props.canvas);
    let updatedRegion = updatedAllComponents[this.state.grabbedComponentCurrRegion].components;
    const oldIndex = this.state.grabbedComponentIndex;
    let newIndex = this.state.grabbedComponentIndex;

    if (event.key === 'ArrowDown') {
      newIndex++;
      if (newIndex > updatedRegion.length - 1) newIndex = updatedRegion.length - 1;
    } else if (event.key === 'ArrowUp') {
      newIndex--;
      if (newIndex < 0) newIndex = 0;
    }

    updatedRegion.splice(newIndex, 0, updatedRegion.splice(oldIndex, 1)[0]);
    updatedAllComponents[this.state.grabbedComponentCurrRegion].component = updatedRegion;

    this.setState({
      allComponents: updatedAllComponents,
      grabbedComponentIndex: newIndex,
    });
  }

  handleRightLeft(event) {
    event.preventDefault();
    let updatedAllComponents = Object.assign({}, this.props.canvas);
    const oldRegionName = `builder-${this.state.grabbedComponentCurrRegion}`;
    let newRegionIndex = this.props.canvasRegions.findIndex(reg => reg === oldRegionName);

    if (event.key === 'ArrowRight') {
      newRegionIndex++;
      if (newRegionIndex > this.props.canvasRegions.length - 1) {
        newRegionIndex = this.props.canvasRegions.length - 1;
      }
    } else if (event.key === 'ArrowLeft') {
      newRegionIndex--;
      if (newRegionIndex < 0) newRegionIndex = 0;
    }

    // take the 'builder-' part out of the name
    const newRegionName = this.props.canvasRegions[newRegionIndex].substring(8);
    let updatedOldRegionData = updatedAllComponents[this.state.grabbedComponentCurrRegion].components;
    let updatedNewRegionData = updatedAllComponents[newRegionName].components;

    // take grabbed out of old region
    updatedOldRegionData.splice(this.state.grabbedComponentIndex, 1);
    // add grabbed to top of new region
    updatedNewRegionData.splice(0, 0, this.state.grabbedComponent);

    this.setState({
      allComponents: updatedAllComponents,
      grabbedComponentIndex: 0,
      grabbedComponentCurrRegion: newRegionName,
    });
  }

  render() {
    return (
      <div className="App ht-full dg app-grid bg-gray">
        <Header />
        <main className="dg main-grid dg-stretch">
          <Sidebar />
          <Canvas
            data={this.state.allComponents}
            addComponent={this.addComponent}
            isDragDropMode={this.state.isDragDropMode}
            handleKeyDown={this.handleKeyDown}
            canvasRegions={this.props.canvasRegions}
            handleStartDrag={this.handleStartDrag}
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
