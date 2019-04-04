import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComponent } from './redux/actions';
import { ALL_COMPONENTS } from './redux/constants';

// import classnames from 'classnames';
// import {
//   Button,
//   ButtonGroup,
//   Dropdown,
//   DropdownTrigger,
//   Icon,
// } from '@salesforce/design-system-react';

import Accordion from './components/Accordion';
import Canvas from './components/Canvas';
import Header from './components/Header';
import Tabs from './components/Tabs';

import './App.css';

const mapStateToProps = state => {
  return {
    test: state.test,
    canvas: state.canvas,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addComponent: (componentData, canvasRegion) => dispatch(addComponent(componentData, canvasRegion)),
  };
}

const componentData = [
  {
    component: Tabs,
    children: [
      {
        panelIndex: 0,
        content: <div>Panel 1</div>
      }, {
        panelIndex: 1,
        content: <div>Panel 2</div>
      }, {
        panelIndex: 2,
        content: <div>Panel 3</div>
      }, {
        panelIndex: 0,
        content: <div>Panel 1 too</div>
      }
    ]
  }, {
    component: Accordion,
    children: [
      {
        panelIndex: 0,
        content: <div>Panel 1</div>
      }, {
        panelIndex: 1,
        content: <div>Panel 2</div>
      }, {
        panelIndex: 2,
        content: <div>Panel 3</div>
      }
    ]
  }
];

class ConnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addComponent = (region, component) => {
    return (e) => {
      const targetId = e.target.id;
      const componentToAdd = ALL_COMPONENTS.find(x => x.id === targetId);
      let stateCopy = Object.assign({}, this.props.canvas[region]);
      stateCopy.components.push(componentToAdd);
      this.props.addComponent(region, stateCopy);
    }
  }

  render() {
    //console.log('state', this.props.canvas);
    return (
      <div className="App ht-full dg app-grid bg-gray">
        <Header />
        <main className="dg main-grid dg-stretch">
          <div id="components-sidebar" className="pam bg-white bas border-gray">
            <h2 className="slds-text-heading_small">Lightning Components</h2>
            <button 
              id="chatter"
              onClick={this.addComponent('header')}>
              Add to header
            </button>
          </div>
          <Canvas data={this.props.canvas} />
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

