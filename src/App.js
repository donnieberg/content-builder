import React, { Component } from 'react';
import uniqid from 'uniqid';

import { connect } from 'react-redux';
import { 
  updateRegion,
} from './redux/actions';
import { ALL_COMPONENTS } from './redux/constants';

import {
  cloneObject,
  getAssistiveText,
  getNewIndex,
  getObjectbyKey,
} from './helpers';

import Canvas from './components/Canvas';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Properties from './components/Properties';

import './App.css';

const mapStateToProps = state => {
  return {
    canvas: state.canvas,
    canvasRegions: state.canvasRegions,
    regions: state.regions
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateRegion: (region, regionData) => dispatch(updateRegion(region, regionData))
  };
}

class ConnectedApp extends Component {
  constructor(props) {
    super(props);
    const initAllComponents = cloneObject(this.props.canvas);

    this.state = {
      allComponents: initAllComponents,
      assistiveText: '',
      currFocusedElement: null,
      currFocusedRegion: null,
      grabbedComponent: null,
      grabbedComponentCurrRegion: 'header',
      grabbedComponentIndex: 0,
      grabbedComponentType: null,
      isDragDropMode: false,
    }

    this.addComponent = this.addComponent.bind(this);
    this.handleStartDrag = this.handleStartDrag.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.headerRef = React.createRef();
    this.sidebarRef = React.createRef();
    this.canvasRef = React.createRef();
    this.propertiesRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.state.currFocusedElement !== null) {
      document.getElementById(this.state.currFocusedElement).focus();
    }
  }

  addComponent(region, componentType, componentIndex = 0, parentComponentId = null, panelIndex = -1) {
    let componentToAdd;

    if (this.state.grabbedComponent === null) {
      const cmp = getObjectbyKey(ALL_COMPONENTS, 'id', componentType);
      componentToAdd = cloneObject(cmp);
    } else {
      componentToAdd = cloneObject(this.state.grabbedComponent);
    };

    componentToAdd.id = uniqid();
    componentToAdd.isGrabbed = false;

    let regionDataCopy = cloneObject(this.props.canvas[region]);

    if (panelIndex > -1) {
      let parentComponentData = getObjectbyKey(regionDataCopy.components, 'id', parentComponentId);
      componentToAdd.panelIndex = panelIndex;
      parentComponentData.children.splice(panelIndex, 0, componentToAdd);
    } else regionDataCopy.components.splice(componentIndex, 0, componentToAdd);

    this.props.updateRegion(region, regionDataCopy);
    this.setState({ currFocusedElement: componentToAdd.id });


    return componentToAdd.id;
  }

  handleDrop(shouldFocusDroppedComp) {
    let updatedAllComponents = cloneObject(this.props.canvas);
    let droppedComponentID = this.addComponent(
      this.state.grabbedComponentCurrRegion,
      this.state.grabbedComponentType,
      this.state.grabbedComponentIndex,
    );

    // removes existing grabbed component from updatedAllComponents
    let updatingRegion = updatedAllComponents[this.state.grabbedComponentCurrRegion].components;
    let prevGrabbedComponentIndex = updatingRegion.findIndex(el => el.isGrabbed === true);
    updatingRegion.splice(prevGrabbedComponentIndex, 1);

    let updatedAssistiveText = getAssistiveText(
      this.state.grabbedComponentType,
      this.state.grabbedComponentCurrRegion,
      this.state.grabbedComponentIndex,
      updatingRegion.length,
      'dropped'
    );

    this.setState((prevState) => {
      return {
        allComponents: updatedAllComponents,
        assistiveText: updatedAssistiveText,
        currFocusedElement: shouldFocusDroppedComp ? droppedComponentID : prevState.currFocusedElement,
        grabbedComponent: null,
        grabbedComponentIndex: 0,
        grabbedComponentCurrRegion: 'header',
        isDragDropMode: false,
      }
    });
  }

  handleStartDrag(componentType, event = null) {
    let updatedAllComponents = cloneObject(this.props.canvas);
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
      componentToAdd = cloneObject(
        getObjectbyKey(updatedAllComponents[newRegion].components, 'id', componentHTML.id)
      );
      newComponentIndex = updatedAllComponents[newRegion].components.findIndex(cmp => cmp.id === componentHTML.id);

      // removes component from local state and redux state
      updatedAllComponents[newRegion].components.splice(newComponentIndex, 1);
      this.props.updateRegion(newRegion, updatedAllComponents[newRegion]);
    } else {
      // the new grabbed component
      // had to mess around with referencing a lot - I KEPT OVERWRITING THINGS ON ACCIDENT
      const cmp = getObjectbyKey(ALL_COMPONENTS, 'id', componentType);
      componentToAdd = cloneObject(cmp);
    }

    componentToAdd.id = `floating-${componentType}`;
    componentToAdd.isGrabbed = true;

    updatedAllComponents[newRegion].components.splice(newComponentIndex, 0, componentToAdd);

    let updatedAssistiveText = getAssistiveText(
      componentType,
      newRegion,
      newComponentIndex,
      updatedAllComponents[newRegion].components.length,
      'grabbed'
    );

    this.setState({
      allComponents: updatedAllComponents,
      assistiveText: updatedAssistiveText,
      currFocusedElement: componentToAdd.id,
      isDragDropMode: true,
      grabbedComponent: componentToAdd,
      grabbedComponentIndex: newComponentIndex,
      grabbedComponentType: componentType,
      grabbedComponentCurrRegion: newRegion,
    });
  }

  handleF6 = (event) => {
    console.log(this.state.currFocusedRegion);
    if (event.key === 'F6') {
      switch(this.state.currFocusedRegion) {
        case null:
          console.log('focus header');
          this.headerRef.current.focus();
          this.setState({ currFocusedRegion: 'HEADER' })
          break;
        case 'HEADER':
          console.log('focus comp panel');
          this.sidebarRef.current.focus();
          this.setState({ currFocusedRegion: 'COMPONENT_PANEL' })
          break;
        case 'COMPONENT_PANEL':
          console.log('focus canvas');
          this.canvasRef.current.focus();
          this.setState({ currFocusedRegion: 'CANVAS' })
          break;
        case 'CANVAS':
          console.log('focus prop panel');
          this.propertiesRef.current.focus();
          this.setState({ currFocusedRegion: 'PROPERTY_PANEL' })
          break;
        case 'PROPERTY_PANEL':
          console.log('focus header');
          this.headerRef.current.focus();
          this.setState({ currFocusedRegion: 'HEADER' })
          break;
        default:
          console.log('error');
      }
    }
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
    let updatedAllComponents = cloneObject(this.props.canvas);
    let updatedRegion = updatedAllComponents[this.state.grabbedComponentCurrRegion].components;
    const oldIndex = this.state.grabbedComponentIndex;
    let newIndex = getNewIndex(updatedRegion, oldIndex, event.key === 'ArrowDown' ? 'add' : 'sub');

    updatedRegion.splice(newIndex, 0, updatedRegion.splice(oldIndex, 1)[0]);
    updatedAllComponents[this.state.grabbedComponentCurrRegion].component = updatedRegion;

    let updatedAssistiveText = getAssistiveText(
      this.state.grabbedComponentType,
      this.state.grabbedComponentCurrRegion,
      newIndex,
      updatedRegion.length,
      'grabbed'
    );

    this.setState({
      allComponents: updatedAllComponents,
      assistiveText: updatedAssistiveText,
      grabbedComponentIndex: newIndex,
    });
  }

  handleRightLeft(event) {
    event.preventDefault();
    let updatedAllComponents = cloneObject(this.props.canvas);
    const oldRegionName = `builder-${this.state.grabbedComponentCurrRegion}`;
    let newRegionIndex = getNewIndex(
      this.props.canvasRegions,
      this.props.canvasRegions.findIndex(reg => reg === oldRegionName),
      event.key === 'ArrowRight' ? 'add' : 'sub'
    );

    // take the 'builder-' part out of the name
    const newRegionName = this.props.canvasRegions[newRegionIndex].substring(8);
    let updatedOldRegionData = updatedAllComponents[this.state.grabbedComponentCurrRegion].components;
    let updatedNewRegionData = updatedAllComponents[newRegionName].components;

    // take grabbed out of old region
    updatedOldRegionData.splice(this.state.grabbedComponentIndex, 1);
    // add grabbed to top of new region
    updatedNewRegionData.splice(0, 0, this.state.grabbedComponent);

    let updatedAssistiveText = getAssistiveText(
      this.state.grabbedComponentType,
      newRegionName,
      0,
      updatedNewRegionData.length,
      'grabbed'
    );

    this.setState({
      allComponents: updatedAllComponents,
      assistiveText: updatedAssistiveText,
      grabbedComponentIndex: 0,
      grabbedComponentCurrRegion: newRegionName,
    });
  }

  render() {
    return (
      <div className="App ht-full dg app-grid bg-gray" onKeyDown={this.handleF6}>
        <Header headerRef={this.headerRef} />
        <main className="dg main-grid dg-stretch">
          <Sidebar handleStartDrag={this.handleStartDrag} sidebarRef={this.sidebarRef} />
          <Canvas
            data={this.state.allComponents}
            addComponent={this.addComponent}
            isDragDropMode={this.state.isDragDropMode}
            handleKeyDown={this.handleKeyDown}
            canvasRegions={this.props.canvasRegions}
            handleStartDrag={this.handleStartDrag}
            canvasRef={this.canvasRef}
          />
          <div id="properties-sidebar" className="pam bg-white bas border-gray" ref={this.propertiesRef} tabIndex="-1">
            <Properties />
          </div>
        </main>
        <div aria-live="assertive" className="pam slds-text-heading_large bg-navy text-white">
          {this.state.assistiveText}
        </div>
      </div>
    );
  }
}

// connects react component to the redux store
const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);
export default App;
