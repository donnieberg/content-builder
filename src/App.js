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
    this.addComponent = this.addComponent.bind(this);
  }


  // adding tabs/accordions broken rn
  addComponent(region, component, parentComponentId, panelIndex) {
    console.log(parentComponentId, panelIndex)
    let componentToAdd = ALL_COMPONENTS.find(x => x.id === component);
    componentToAdd.id = uniqid();
    let regionDataCopy = Object.assign({}, this.props.canvas[region]);

    if (panelIndex > -1) {
      let parentComponentData = regionDataCopy.components.find(x => x.id === parentComponentId);
      componentToAdd.panelIndex = panelIndex;
      parentComponentData.children.push(componentToAdd);
    } else regionDataCopy.components.push(componentToAdd);

    this.props.addComponent(region, regionDataCopy);
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
                  onClick={(e) => {
                    this.addComponent('header', component.id)
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
          <Canvas data={this.props.canvas} addComponent={this.addComponent} />
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
