import React, { Component } from 'react';
import { connect } from 'react-redux';

import Accordion from './components/Accordion';
import Tabs from './components/Tabs';

import './App.css';

const mapStateToProps = state => {
  return {
    test: state.test
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
]

class ConnectedApp extends Component {
  render() {
    const Component = componentData[0].component;
    return (
      <div className="App">
        {/* hi */}
        {/* {this.props.test} */}

        {
          <Component {...componentData[0].children} />
        }
        {/* <Accordion data={componentData[1]} />
        <Tabs data={componentData[0]} /> */}
      </div>
    );
  }
}

// connects react component to the redux store
const App = connect(mapStateToProps, null)(ConnectedApp);
export default App;
