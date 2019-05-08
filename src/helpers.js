import React from 'react';
import classnames from 'classnames';
import { Button, ButtonGroup } from '@salesforce/design-system-react';

export function cloneObject(obj) {
  return Object.assign({}, obj);
}

export function getAssistiveText(cmpType, region, index, numCmpsInRegion, action) {
  return (`
    ${cmpType} ${action}, 
    in ${region}. 
    Current position ${index + 1} of ${numCmpsInRegion}.
  `);
}

export function getNewIndex(arr, currIndex, operation) {
  let newIndex = currIndex;
  if (operation === 'add') {
    newIndex++;
    if (newIndex > arr.length - 1) newIndex = arr.length - 1;
  } else if (operation === 'sub') {
    newIndex--;
    if (newIndex < 0) newIndex = 0;
  }
  return newIndex;
}

export function getObjectbyKey(obj, key, val) {
  return obj.find(el => el[key] === val);
}

export function renderComponent(componentData, region, handleKeyDown, handleStartDrag, addComponent) {
  if (typeof (componentData.component) === 'string') {
    return (
      <div
        className={classnames("component",
          {
            "grabbed": componentData.isGrabbed,
          }
        )}
        id={componentData.id}
        key={componentData.id}
        tabIndex="0"
        onKeyDown={handleKeyDown}
        data-type={componentData.value}
      >
        <ButtonGroup className="">
          <Button
            assistiveText={{ icon: `Grab ${componentData.label}` }}
            iconCategory="utility"
            iconName="rows"
            onClick={handleStartDrag}
          />
          <Button
            assistiveText={{ icon: `Delete ${componentData.label}` }}
            iconCategory="utility"
            iconName="delete"
          />
        </ButtonGroup>
        <div
          className="mbs bg-gray pal"
        >
          {componentData.label}
        </div>
      </div>
    );
  } else {
    const ReactComponent = componentData.component;
    return (
      <div
        className={classnames("component",
          {
            "grabbed": componentData.isGrabbed,
          }
        )}
        data-type={componentData.value}
        id={componentData.id}
        key={`component-${componentData.id}`}
        onKeyDown={handleKeyDown}
        tabIndex="0"
      >
        <ButtonGroup className="">
          <Button
            assistiveText={{ icon: `Grab ${componentData.label}` }}
            iconCategory="utility"
            iconName="rows"
            onClick={handleStartDrag}
          />
          <Button
            assistiveText={{ icon: `Delete ${componentData.label}` }}
            iconCategory="utility"
            iconName="delete"
          />
        </ButtonGroup>
        <ReactComponent
          addComponent={addComponent}
          children={componentData.children}
          className="mbs"
          handleKeyDown={handleKeyDown}
          handleStartDrag={handleStartDrag}
          id={`${componentData.id}`}
          region={region}
        />
      </div>
    )
  }
}
