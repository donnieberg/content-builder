import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  render() {
    console.log(this.props.test)
    return (
      <div className="App ht-full dg app-grid bg-gray">
        <Header />
        <main className="dg main-grid dg-stretch">
          <div id="components-sidebar" className="pam bg-white bas border-gray">
            <h2 className="slds-text-heading_small">Lightning Components</h2>
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
const App = connect(mapStateToProps, null)(ConnectedApp);
export default App;
