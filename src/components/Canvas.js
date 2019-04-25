import React, { Component } from 'react';
import {
  Button,
  Dropdown,
  DropdownTrigger,
} from '@salesforce/design-system-react';
import classnames from 'classnames';

import { ALL_COMPONENTS } from '../redux/constants';

class Canvas extends Component {
  constructor(props) {
    super(props);

    const initAllComponents = Object.assign({}, this.props.data);

    this.state = {
      grabbedComponentIndex: 0,
      allComponents: initAllComponents,
    }

    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    // this.dropComponent = this.dropComponent.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.isDragDropMode) {
      console.log('before state', this.state.allComponents)
      let updatedAllComponents = Object.assign({}, nextProps.data);
      let componentToAdd = ALL_COMPONENTS.find(x => x.id === nextProps.grabbedComponentType);
      componentToAdd.isGrabbed = true;
      componentToAdd.id = `floating-${nextProps.grabbedComponentType}`;
      updatedAllComponents[nextProps.grabbedComponentCurrRegion].components.splice(this.state.grabbedComponentIndex, 0, componentToAdd);


      console.log('after state', this.state.allComponents);
      // this.renderComponents():
      // this.setState({
      //   allComponents: updatedAllComponents,
      // })

      // console.log('updatedAllComponents', updatedAllComponents)

    }
  }

  handleKeyEvent = (event) => {
    if (event.key === ' ') {
      this.handleSpaceKey(event);
    }
  }

  handleSpaceKey(event) {
    console.log(event.key);
  }

  // renderFloatingComponent(region) {
  //   // debugger;
  //   const grabbedComponentType = this.props.grabbedComponent;
  //   const grabbedComponentRegion = this.props.grabbedComponentCurrRegion;

  //   // debugger;
  //   if (region === grabbedComponentRegion && grabbedComponentType !== null) {
  //     let componentToAdd = ALL_COMPONENTS.find(x => x.id === grabbedComponentType);
  //     componentToAdd.id = `floating-${grabbedComponentType}`;

  //     if (typeof (componentToAdd.component) === 'string') {
  //       return (
  //         <div
  //           className="mbs bg-gray pal grabbed"
  //           id={componentToAdd.id}
  //           tabIndex="0"
  //           onKeyDown={this.handleKeyEvent}
  //         // onBlur={this.dropComponent}
  //         >
  //           {componentToAdd.label}
  //         </div>
  //       );
  //     } else {
  //       const ReactComponent = componentToAdd.component;
  //       return (
  //         <ReactComponent
  //           id={componentToAdd.id}
  //           className="mbs grabbed"
  //           children={componentToAdd.children}
  //           addComponent={this.props.addComponent}
  //           region={region}
  //         />
  //       )
  //     }


  //   }
  // }

  renderComponents(region, components) {
    if (components.length === 0) {
      return (
        <Dropdown
          align="left"
          className="wi-full"
          options={ALL_COMPONENTS}
          onSelect={(e) => {
            this.props.addComponent(region, e.value);
          }}
        >
          <DropdownTrigger>
            <Button label={`Add a Component: ${region} Region`} />
          </DropdownTrigger>
        </Dropdown>
      );
    } else {
      return (
        components.map((componentData, i) => {
          if (typeof (componentData.component) === 'string') {
            return (
              <div
                className={classnames("mbs bg-gray pal",
                  {
                    "grabbed": componentData.isGrabbed,
                  }
                )}
                id={componentData.id}
                key={componentData.id}
                tabIndex="0"
                onKeyDown={this.handleKeyEvent}
              >
                {componentData.label}
              </div>
            );
          } else {
            const ReactComponent = componentData.component;
            return (
              <ReactComponent
                id={componentData.id}
                className="mbs"
                children={componentData.children}
                key={`component-${i}`}
                addComponent={this.props.addComponent}
                region={region}
              // onKeyDown={this.handleKeyEvent}
              />
            )
          }
        })
      )
    }
  }

  render() {
    console.log(this.state.allComponents)
    return (
      <div id="main-builder" className="maxs mbn pam pbn bg-blue dg builder-grid dg-stretch">
        {
          Object.keys(this.props.data).map((region, i) => {
            return (
              <section
                id={`builder-${region}`}
                className="builder-region slds-text-align_center"
                aria-labelledby={`builder-${region}-header`}
                key={i}
              >
                <h2 className="slds-assistive-text">{region} region</h2>
                <div className="mal" id={`builder-${region}-components`}>
                  {this.renderComponents(region, this.state.allComponents[region].components)}
                  {/* {this.state.inDragDropMode ?
                    this.renderFloatingComponent(region) : null
                  } */}
                </div>
              </section>
            );
          })
        }
      </div>
    );
  }
}

export default Canvas;
