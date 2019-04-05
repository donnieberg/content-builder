import React, { Component } from 'react';
import { Button } from '@salesforce/design-system-react';

import { connect } from 'react-redux';
import { addComponent } from './redux/actions';
import { ALL_COMPONENTS } from './redux/constants';

import Canvas from './components/Canvas';
import Header from './components/Header';

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

  renderSidebarButtons() {
    return (
      <ul>
        {
          ALL_COMPONENTS.map((component, i) => {
            return (
              <li className="mbs ">
                <Button
                  iconCategory={component.rightIcon.category}
                  iconName={component.rightIcon.name}
                  iconPosition="left"
                  label={component.label}
                  onClick={this.addComponent('header')}
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
