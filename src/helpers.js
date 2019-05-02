import React from 'react';
import classnames from 'classnames';
import { Button, ButtonGroup } from '@salesforce/design-system-react';

export function renderComponent(componentData, region, handleKeyDown, handleStartDrag) {
  if (typeof (componentData.component) === 'string') {
    return (
      <div
        className={classnames(
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
        key={`component-${componentData.id}`}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        data-type={componentData.value}
        id={componentData.id}
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
          id={`comp-${componentData.id}`}
          className="mbs"
          children={componentData.children}
          region={region}
          handleStartDrag={handleStartDrag}
          handleKeyDown={handleKeyDown}
        />
      </div>
    )
  }
}