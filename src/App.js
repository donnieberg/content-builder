import React, { Component } from 'react';
import uniqid from 'uniqid';

import { connect } from 'react-redux';
import { ALL_COMPONENTS } from './redux/constants';

import { initComponents } from './initComponents';

import {
  cloneObject,
  getAssistiveText,
  // getNewIndex,
  getObjectbyKey,
} from './helpers';

import Canvas from './components/Canvas';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Properties from './components/Properties';

import './App.css';

const mapStateToProps = state => {
  return { regions: state.regions };
}

class ConnectedApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allComponents: initComponents,
      assistiveText: '',
      currFocusedElement: null,
      currFocusedRegion: null,
      grabbedComponent: null,
      grabbedComponentCurrRegion: null,
      isDragDropMode: false,
    }

    this.handleNewComponent = this.handleNewComponent.bind(this);
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

  handleNewComponent(type, region = 'header', parentId = null, panelIndex = null) {
    // TD: should the new component init to grabbed?

    // newComponent: copy of the component from constants
    let newComponent = cloneObject(getObjectbyKey(ALL_COMPONENTS, 'id', type));
    let updatedComponents = cloneObject(this.state.allComponents);
    let assistiveText = getAssistiveText(type, region, 0, 1, 'added');

    newComponent.id = uniqid();

    if (parentId === null || panelIndex === null) {
      updatedComponents[region].components.splice(0, 0, newComponent);
    } else {
      let parentComponent = getObjectbyKey(updatedComponents[region].components, 'id', parentId);
      parentComponent.panels[panelIndex].components.splice(0, 0, newComponent);
    }

    this.setState({
      allComponents: updatedComponents,
      assistiveText,
      currFocusedElement: newComponent.id,
    });
  }

  handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();

      if (this.state.grabbedComponent === null) this.handleGrab(event);
      else if (event.target.id === this.state.grabbedComponent.id) this.handleDrop(event);
    } else if (this.state.isDragDropMode && event.target.id === this.state.grabbedComponent.id) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        event.stopPropagation();
        this.handleMoveRegion(event);
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        event.stopPropagation();
        this.handleMoveIndex(event);
      }
    }
  }

  handleGrab(event) {
    if (this.state.grabbedComponent !== null) this.handleDrop(event);

    const componentHTML = event.target;
    const region = event.target.closest('section').id.substring(8);
    let assistiveText;
    let grabbedComponent;

    if (componentHTML.hasAttribute('data-panelindex')) {
      const panelIndex = componentHTML.getAttribute('data-panelindex');
      const parentHTML = event.target.closest('div.parent-component');
      const parentId = parentHTML.getAttribute('id');
      let parentObject = getObjectbyKey(this.state.allComponents[region].components, 'id', parentId);
      grabbedComponent = getObjectbyKey(parentObject.panels[panelIndex].components, 'id', componentHTML.id);

      assistiveText = getAssistiveText(
        componentHTML.getAttribute('data-type'),
        region,
        parentObject.panels[panelIndex].components.findIndex((cmp) => cmp.id === componentHTML.id),
        parentObject.panels[panelIndex].components.length,
        'grabbed',
        parentHTML.getAttribute('data-type'),
        parentObject.panels[panelIndex].name,
      )
    } else {
      grabbedComponent = getObjectbyKey(this.state.allComponents[region].components, 'id', componentHTML.id);

      assistiveText = getAssistiveText(
        componentHTML.getAttribute('data-type'),
        region,
        this.state.allComponents[region].components.findIndex((cmp) => cmp.id === componentHTML.id),
        this.state.allComponents[region].components.length,
        'grabbed',
      )
    }

    grabbedComponent.id = `floating-${grabbedComponent.value}`;
    grabbedComponent.isGrabbed = true;

    this.setState({
      assistiveText,
      currFocusedElement: grabbedComponent.id,
      grabbedComponent,
      grabbedComponentCurrRegion: region,
      isDragDropMode: true,
    });
  }

  handleDrop(event) {
    let allComponents = cloneObject(this.state.allComponents);
    let grabbedComponent = this.state.grabbedComponent;
    let assistiveText;
    let regionComponents;

    if (event.target.hasAttribute('data-panelindex')) {
      const panelIndex = event.target.getAttribute('data-panelindex');
      const parentId = event.target.closest('div.parent-component').getAttribute('id');
      const parentObject = getObjectbyKey(
        allComponents[this.state.grabbedComponentCurrRegion].components,
        'id',
        parentId
      );

      regionComponents = parentObject.panels[panelIndex].components;

      assistiveText = getAssistiveText(
        grabbedComponent.value,
        this.state.grabbedComponentCurrRegion,
        regionComponents.findIndex((cmp) => cmp.id === grabbedComponent.id),
        regionComponents.length,
        'dropped',
        parentObject.value,
        parentObject.panels[panelIndex].name,
      );
    } else {
      regionComponents = allComponents[this.state.grabbedComponentCurrRegion].components;
      assistiveText = getAssistiveText(
        grabbedComponent.value,
        this.state.grabbedComponentCurrRegion,
        regionComponents.findIndex((cmp) => cmp.id === grabbedComponent.id),
        regionComponents.length,
        'dropped'
      );
    }

    let cmpInAllComponents = getObjectbyKey(regionComponents, 'id', grabbedComponent.id);

    cmpInAllComponents.isGrabbed = false;
    cmpInAllComponents.id = uniqid();

    this.setState({
      allComponents,
      assistiveText,
      currFocusedElement: cmpInAllComponents.id,
      grabbedComponent: null,
      grabbedComponentCurrRegion: null,
      isDragDropMode: false,
    });
  }

  handleMoveRegion(event) {
    let allComponents = cloneObject(this.state.allComponents);
    let grabbedComponent = cloneObject(this.state.grabbedComponent);
    const regions = Object.keys(allComponents);
    const currentRegionIndex = regions.findIndex((region) => region === this.state.grabbedComponentCurrRegion);
    let componentIndex;
    let assistiveText;
    let newRegion;
    let shouldRemoveOld = false;

    // add the component to the new region
    if (event.key === 'ArrowRight' && currentRegionIndex < regions.length - 1) {
      newRegion = regions[currentRegionIndex + 1];
      allComponents[newRegion].components.splice(0, 0, grabbedComponent);
      shouldRemoveOld = true;
    } else if (event.key === 'ArrowLeft' && currentRegionIndex > 0) {
      newRegion = regions[currentRegionIndex - 1]
      allComponents[newRegion].components.splice(0, 0, grabbedComponent);
      shouldRemoveOld = true;
    }

    if (shouldRemoveOld) {
      if (event.target.hasAttribute('data-panelindex')) {
        const panelIndex = event.target.getAttribute('data-panelindex');
        const parentId = event.target.closest('div.parent-component').getAttribute('id');
        const parentObject = getObjectbyKey(
          this.state.allComponents[regions[currentRegionIndex]].components,
          'id',
          parentId
        );

        componentIndex = parentObject.panels[panelIndex].components.findIndex((cmp) => cmp.id === grabbedComponent.id);
        parentObject.panels[panelIndex].components.splice(componentIndex, 1);
      } else {
        componentIndex = allComponents[regions[currentRegionIndex]].components.findIndex((cmp) => cmp.id === grabbedComponent.id);
        allComponents[regions[currentRegionIndex]].components.splice(componentIndex, 1);
      }

      assistiveText = getAssistiveText(
        grabbedComponent.value,
        newRegion,
        0,
        allComponents[newRegion].components.length,
        'moved'
      );

      this.setState({
        allComponents,
        assistiveText,
        grabbedComponentCurrRegion: newRegion,
      });
    }
  }

  handleMoveIndex(event) {
    let allComponents = cloneObject(this.state.allComponents);
    let grabbedComponent = cloneObject(this.state.grabbedComponent);
    let currentComponentIndex;
    let region;
    let newIndex;
    let assistiveText;

    if (event.key === 'ArrowDown') {
      if (event.target.hasAttribute('data-panelindex')) {
        const panelIndex = parseInt(event.target.getAttribute('data-panelindex'));
        const parentObject = getObjectbyKey(
          allComponents[this.state.grabbedComponentCurrRegion].components,
          'id',
          event.target.closest('div.parent-component').getAttribute('id')
        );

        region = parentObject.panels[panelIndex].components;
        currentComponentIndex = region.findIndex((cmp) => cmp.id === grabbedComponent.id);

        if (currentComponentIndex < region.length - 1) {
          newIndex = currentComponentIndex + 1;
          region.splice(newIndex, 0, region.splice(currentComponentIndex, 1)[0]);
          // (cmpType, region, index, numCmpsInRegion, action, parentType = null, panelName = null) {
          assistiveText = getAssistiveText(
            grabbedComponent.value,
            parentObject.value,
            newIndex,
            region.length,
            'moved',
          );
        } else {
          if (panelIndex < parentObject.panels.length - 1) {
            // TD: component moves to new panel, but it doesn't open.
            parentObject.panels[panelIndex + 1].components.splice(
              0, 0, region.splice(currentComponentIndex, 1)[0]
            );
            assistiveText = getAssistiveText(
              grabbedComponent.value,
              parentObject.value,
              newIndex,
              region.length,
              'moved',
            );
          } else {
            const newRegion = allComponents[this.state.grabbedComponentCurrRegion].components;
            const parentIndex = newRegion.findIndex((cmp) => (
              cmp.id === parentObject.id
            ));
            newRegion.splice(parentIndex + 1, 0, region.splice(currentComponentIndex, 1)[0]);
            assistiveText = getAssistiveText(
              grabbedComponent.value,
              this.state.grabbedComponentCurrRegion,
              parentIndex + 1,
              newRegion.length,
              'moved',
            );
          }
        }
        this.setState({
          assistiveText,
          allComponents,
        });
      } else {
        region = allComponents[this.state.grabbedComponentCurrRegion].components;
        currentComponentIndex = region.findIndex((cmp) => (
          cmp.id === grabbedComponent.id
        ));

        if (currentComponentIndex < region.length - 1) {
          newIndex = currentComponentIndex + 1;
          if (region[newIndex].panels === undefined) {
            region.splice(newIndex, 0, region.splice(currentComponentIndex, 1)[0]);
          } else {
            region[newIndex].panels[0].components.splice(0, 0, region.splice(currentComponentIndex, 1)[0]);
          }

          assistiveText = getAssistiveText(
            grabbedComponent.value,
            this.state.grabbedComponentCurrRegion,
            newIndex,
            region.length,
            'moved',
          );

          this.setState({
            assistiveText,
            allComponents,
          });
        }
      }
    } else if (event.key === 'ArrowUp') {
      if (event.target.hasAttribute('data-panelindex')) {
        const panelIndex = parseInt(event.target.getAttribute('data-panelindex'));
        const parentObject = getObjectbyKey(
          allComponents[this.state.grabbedComponentCurrRegion].components,
          'id',
          event.target.closest('div.parent-component').getAttribute('id')
        );

        region = parentObject.panels[panelIndex].components;
        currentComponentIndex = region.findIndex((cmp) => cmp.id === grabbedComponent.id);

        if (currentComponentIndex > 0) {
          newIndex = currentComponentIndex - 1;
          region.splice(newIndex, 0, region.splice(currentComponentIndex, 1)[0]);
          assistiveText = getAssistiveText(
            grabbedComponent.value,
            parentObject.value,
            newIndex,
            region.length,
            'moved',
          );
        } else {
          if (panelIndex > 0) {
            // TD: component moves to new panel, but it doesn't open.
            parentObject.panels[panelIndex - 1].components.splice(
              0, 0, region.splice(currentComponentIndex, 1)[0]
            );
            assistiveText = getAssistiveText(
              grabbedComponent.value,
              parentObject.value,
              newIndex,
              region.length,
              'moved',
            );
          } else {
            const newRegion = allComponents[this.state.grabbedComponentCurrRegion].components;
            const parentIndex = newRegion.findIndex((cmp) => (
              cmp.id === parentObject.id
            ));
            newRegion.splice(parentIndex - 1, 0, region.splice(currentComponentIndex, 1)[0]);
            assistiveText = getAssistiveText(
              grabbedComponent.value,
              this.state.grabbedComponentCurrRegion,
              parentIndex - 1,
              newRegion.length,
              'moved',
            );
          }
        }
        this.setState({
          assistiveText,
          allComponents,
        });
      } else {
        region = allComponents[this.state.grabbedComponentCurrRegion].components;
        currentComponentIndex = region.findIndex((cmp) => (
          cmp.id === grabbedComponent.id
        ));

        if (currentComponentIndex > 0) {
          newIndex = currentComponentIndex - 1;
          if (region[newIndex].panels === undefined) {
            region.splice(newIndex, 0, region.splice(currentComponentIndex, 1)[0]);
          } else {
            let newPanel = region[newIndex].panels[region[newIndex].panels.length - 1];
            newPanel.components.splice(
              0, 0, region.splice(currentComponentIndex, 1)[0]
            );
          }

          assistiveText = getAssistiveText(
            grabbedComponent.value,
            this.state.grabbedComponentCurrRegion,
            newIndex,
            region.length,
            'moved',
          );

          this.setState({
            assistiveText,
            allComponents,
          });
        }
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

  render() {
    return (
      <div className="App ht-full dg app-grid bg-gray" onKeyDown={this.handleF6}>
        <div aria-live="assertive" className="pam slds-text-heading_large bg-navy text-white">
          {this.state.assistiveText}
        </div>
        <Header headerRef={this.headerRef} />
        <main className="dg main-grid dg-stretch">
          <Sidebar handleNewComponent={this.handleNewComponent} sidebarRef={this.sidebarRef} />
          <Canvas
            data={this.state.allComponents}
            // addComponent={this.addComponent}
            isDragDropMode={this.state.isDragDropMode}
            handleKeyDown={this.handleKeyDown}
            handleNewComponent={this.handleNewComponent}
            // canvasRegions={this.props.canvasRegions}
            // handleStartDrag={this.handleStartDrag}
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
const App = connect(mapStateToProps, null)(ConnectedApp);
export default App;
