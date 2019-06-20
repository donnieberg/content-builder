import React, { Component } from 'react';
import uniqid from 'uniqid';
import uniqBy from 'lodash.uniqby';

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
    console.log('APP.JS DIDUPDATE BABYYYY', this.props.canvas)
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
    let droppedComponentID; // this.addComponent will add object to redux and returns it's new ID
    let prevGrabbedComponentIndex;
    let updatedAllComponents = cloneObject(this.props.canvas); // copy of current local state
    let updatingRegion = updatedAllComponents[this.state.grabbedComponentCurrRegion].components;

    // Case 1: Drop on canvas
    if (this.state.grabbedComponent.panelIndex === undefined) {
      droppedComponentID = this.addComponent(
        this.state.grabbedComponentCurrRegion,
        this.state.grabbedComponentType,
        this.state.grabbedComponentIndex,
      );

      // remove grabbed version of component from local state
      prevGrabbedComponentIndex = updatingRegion.findIndex(el => el.isGrabbed === true);
      updatingRegion.splice(prevGrabbedComponentIndex, 1);
    }
    // Case 2: Drop within another component
    else {
      droppedComponentID = this.addComponent(
        this.state.grabbedComponentCurrRegion,
        this.state.grabbedComponentType,
        this.state.grabbedComponentIndex,
        this.state.grabbedComponent.parentId,
        this.state.grabbedComponent.panelIndex,
      );

      // remove grabbed version of component from local state
      let parentObj = getObjectbyKey(
        updatingRegion,
        'id',
        this.state.grabbedComponent.parentId,
      );

      prevGrabbedComponentIndex = parentObj.children.findIndex(el => el.isGrabbed === true);
      parentObj.children.splice(prevGrabbedComponentIndex, 1);
    }

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
        isDragDropMode: false,
      }
    });
  }

  handleStartDrag(componentType, event = null, panelIndex = null, initRegion = null, parentId = null) {
    let componentToAdd;
    let localStateIndex = 0; // default new component index
    let region = initRegion === null ? 'header' : initRegion; // default new component location
    let updatedAllComponents = cloneObject(this.props.canvas); // copy of current local state

    // Drop currently grabbed component (can only have 1 grabbed at a time)
    if (this.state.grabbedComponent !== null) this.handleDrop();

    // 5 Cases: 
    //   * add new component from the sidebar
    //   * add new component from button on canvas
    //   * add new component from button within another component
    //   * move component already on canvas 
    //   * move component within another component

    // Cases 1 & 2: Add component from sidebar/button on canvas 
    if (event === null && parentId === null) {
      // componentToAdd = a copy of base data for new component from constants
      const cmp = getObjectbyKey(ALL_COMPONENTS, 'id', componentType);
      componentToAdd = cloneObject(cmp);

      // add the component into local state copy
      updatedAllComponents[region].components.splice(localStateIndex, 0, componentToAdd);
    }

    // Case 3: Add component from button within another component
    else if (event === null && panelIndex !== null && parentId !== null) {
      // componentToAdd = a copy of base data for new component from constants
      const cmp = getObjectbyKey(ALL_COMPONENTS, 'id', componentType);
      componentToAdd = cloneObject(cmp);
      componentToAdd.panelIndex = panelIndex;
      componentToAdd.parentId = parentId;

      // add the component into local state copy
      let parentCmp = getObjectbyKey(
        updatedAllComponents[region].components,
        'id',
        parentId
      );
      parentCmp.children.push(componentToAdd);
    }

    // Case 4: Move component already on canvas
    else if (event !== null && panelIndex === null) {
      const componentHTML = event.target.closest('div.component');
      region = event.target.closest('section').id.substring(8);

      // componentToAdd = a copy of the existing component from local state
      componentToAdd = cloneObject(
        getObjectbyKey(updatedAllComponents[region].components, 'id', componentHTML.id)
      );

      // remove componentToAdd from redux since it isn't in it's 'saved' location anymore
      localStateIndex = updatedAllComponents[region].components.findIndex(cmp => cmp.id === componentHTML.id);
      updatedAllComponents[region].components.splice(localStateIndex, 1);
      this.props.updateRegion(region, updatedAllComponents[region]);

      // add the component back into local state copy *only* [I DON'T LIKE THIS, WILL CHANGE LATER IF HAVE TIME]
      updatedAllComponents[region].components.splice(localStateIndex, 0, componentToAdd);
    }

    // Case 5: Move component within another component
    else if (event !== null && panelIndex !== null) {
      const componentHTML = event.target.closest('div.component');
      const parentId = event.target.getAttribute('data-parentid');
      region = event.target.closest('section').id.substring(8);

      // parentObj = the object in local state that the component is currently in
      let parentObj = getObjectbyKey(updatedAllComponents[region].components, 'id', parentId);

      // componentToAdd = a copy of the existing component within the parent from local state
      componentToAdd = cloneObject(getObjectbyKey(parentObj.children, 'id', componentHTML.id));
      componentToAdd.parentId = parentId;

      // remove componentToAdd from redux since it isn't in it's 'saved' location anymore
      localStateIndex = parentObj.children.findIndex(cmp => cmp.id === componentHTML.id);
      parentObj.children.splice(localStateIndex, 1);
      this.props.updateRegion(region, updatedAllComponents[region]);

      // add the component back into local state copy *only* [I DON'T LIKE THIS, WILL CHANGE LATER IF HAVE TIME]
      parentObj.children.splice(localStateIndex, 0, componentToAdd);
    }

    componentToAdd.id = `floating-${componentType}`;
    componentToAdd.isGrabbed = true;

    let updatedAssistiveText = getAssistiveText(
      componentType,
      region,
      localStateIndex,
      updatedAllComponents[region].components.length,
      'grabbed'
    );

    console.log('componentToAdd handleStartDrag', updatedAllComponents)

    this.setState({
      allComponents: updatedAllComponents,
      assistiveText: updatedAssistiveText,
      currFocusedElement: componentToAdd.id,
      isDragDropMode: true,
      grabbedComponent: componentToAdd,
      grabbedComponentIndex: localStateIndex,
      grabbedComponentType: componentType,
      grabbedComponentCurrRegion: region,
    });
  }

  handleKeyDown(event, panelIndex = null) {
    if (event.key === ' ') {
      event.preventDefault();
      if (this.state.grabbedComponent !== null) this.handleDrop(true);
      else this.handleStartDrag(event.target.getAttribute('data-type'), event, panelIndex);
      event.stopPropagation();
    }

    console.log('handleKeyDown: all components', this.state.allComponents)

    if (this.state.isDragDropMode) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        console.log('handleKeyDown: does this run twice?')
        this.handleRightLeft(event);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        this.handleUpDown(event);
      }
    }
  }

  handleF6 = (event) => {
    if (event.key === 'F6') {
      switch (this.state.currFocusedRegion) {
        case null:
          this.headerRef.current.focus();
          this.setState({ currFocusedRegion: 'HEADER' })
          break;
        case 'HEADER':
          this.sidebarRef.current.focus();
          this.setState({ currFocusedRegion: 'COMPONENT_PANEL' })
          break;
        case 'COMPONENT_PANEL':
          this.canvasRef.current.focus();
          this.setState({ currFocusedRegion: 'CANVAS' })
          break;
        case 'CANVAS':
          this.propertiesRef.current.focus();
          this.setState({ currFocusedRegion: 'PROPERTY_PANEL' })
          break;
        case 'PROPERTY_PANEL':
          this.headerRef.current.focus();
          this.setState({ currFocusedRegion: 'HEADER' })
          break;
        default:
          console.log('error');
      }
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
    console.log('handleRightLeft: event target', event.target)
    // console.log('handleRightLeft: event target parent', event.target.parentNode)
    console.log('handleRightLeft: all components local state', this.state.allComponents)
    event.preventDefault();
    let updatedAllComponents = cloneObject(this.state.allComponents);
    console.log('handleRightLeft: updatedAllComponents init', updatedAllComponents)
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
    console.log('handleRightLeft: updatedNewRegionData', updatedNewRegionData)

    // take grabbed out of old region
    if (this.state.grabbedComponent.panelIndex === undefined) {
      updatedOldRegionData.splice(this.state.grabbedComponentIndex, 1);
    } else {
      let parentComp = getObjectbyKey(
        updatedOldRegionData,
        'id',
        this.state.grabbedComponent.parentId
      );
      let index = parentComp.children.findIndex(el => el.id === this.state.grabbedComponent.id);
      parentComp.children.splice(index, 1);

      // removes panelindex/parent data from grabbedComponent
      let tmp = cloneObject(this.state.grabbedComponent);
      tmp.panelIndex = undefined;
      tmp.parentId = undefined;
      this.setState({ grabbedComponent: tmp });
    }

    // updatedAllComponents[newRegionName].components = uniqBy(updatedAllComponents[newRegionName].components, 'id');
    console.log('handleRightLeft: updatedAllComponents end', updatedAllComponents)
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
        <div aria-live="assertive" className="pam slds-text-heading_large bg-navy text-white">
          {this.state.assistiveText}
        </div>
        <Header headerRef={this.headerRef} />
        <main className="dg main-grid dg-stretch">
          <Sidebar handleStartDrag={this.handleStartDrag} sidebarRef={this.sidebarRef} />
          <Canvas
            data={this.state.allComponents}
            // addComponent={this.addComponent}
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
      </div>
    );
  }
}

// connects react component to the redux store
const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);
export default App;
