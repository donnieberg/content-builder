import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComponent } from './redux/actions';

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

  addComponent = (region) => {
    return () => {
      const accData = {
        component: Accordion,
        children: [
          {
            panelIndex: 0,
            content: 'Panel 1',
            label: 'Label 1',
          }, {
            panelIndex: 1,
            content: 'Panel 2',
            label: 'Label 2',
          }, {
            panelIndex: 2,
            content: 'Panel 3',
            label: 'Label 3',
          }
        ]
      };

      let stateCopy = Object.assign({}, this.props.canvas);
      let test = stateCopy[region].components.push(accData);
      this.props.addComponent(stateCopy);
    }
  }

  render() {
    return (
      <div className="App ht-full dg app-grid bg-gray">
        <Header />
        <main className="dg main-grid dg-stretch">
          <div id="components-sidebar" className="pam bg-white bas border-gray">
            <h2 className="slds-text-heading_small">Lightning Components</h2>
            <button onClick={this.addComponent('header')}>Add to header</button>
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
