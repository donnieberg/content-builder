import React, { Component } from 'react';
import './App.css';

import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  Icon,
} from '@salesforce/design-system-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHeaderActions() {
    return (
      <ButtonGroup>
        <Button
          assistiveText={{ icon: 'Undo' }}
          iconCategory="utility"
          iconName="undo"
          iconSize="medium"
          iconVariant="border"
          onClick={() => { console.log('Undo Clicked'); }}
          variant="icon"
        />
        <Button
          assistiveText={{ icon: 'Redo' }}
          iconCategory="utility"
          iconName="redo"
          iconSize="medium"
          iconVariant="border"
          onClick={() => { console.log('redo Clicked'); }}
          variant="icon"
        />
        <Button
          assistiveText={{ icon: 'Cut' }}
          iconCategory="utility"
          iconName="cut"
          iconSize="medium"
          iconVariant="border"
          onClick={() => { console.log('cut Clicked'); }}
          variant="icon"
        />
        <Button
          assistiveText={{ icon: 'Copy' }}
          iconCategory="utility"
          iconName="copy"
          iconSize="medium"
          iconVariant="border"
          onClick={() => { console.log('copy Clicked'); }}
          variant="icon"
        />
      </ButtonGroup>
    )
  }

  renderHeaderViews() {
    /* Yes yes, I know these should actually be comboboxes 
     * but Im not concerned about functionality here 
     * cuz theyre just placeholders */
    return (
      <div className="mlx dib">
        <Dropdown
          align="right"
          options={[
            { label: 'Desktop', value: 'A0' },
            { label: 'Mobile', value: 'B0' }
          ]}
        >
          <DropdownTrigger>
            <Button
              className="mrs"
              iconCategory="utility"
              iconName="down"
              iconPosition="right"
              label="Desktop"
            />
          </DropdownTrigger>
        </Dropdown>
        <Dropdown
          align="right"
          options={[
            { label: 'Scale to Fit', value: 'A0' },
            { label: 'Full size', value: 'B0' }
          ]}
        >
          <DropdownTrigger>
            <Button
              className="mhs"
              iconCategory="utility"
              iconName="down"
              iconPosition="right"
              label="Scale to Fit"
            />
          </DropdownTrigger>
        </Dropdown>
        <Button
          className="mhs"
          iconCategory="utility"
          iconName="refresh"
          iconPosition="left"
          label="Refresh"
        />
      </div>
    )
  }

  renderHeaderSave() {
    return (
      <div>
        <Button label="Save" variant="brand" />
        <Button label="Activate" variant="brand" />
      </div>
    )
  }

  render() {
    return (
      <div className="App ht-full dg app-grid bg-gray">
        <header id="header-section">
          <section className="df df-justify bg-navy">
            <div>
              <span className="pam dib brs border-white text-white">
                <Icon category="utility" name="builder" size="small" inverse />
                <span className="phm">Lightning App Builder</span>
              </span>
              <button className="pam dib brs border-white text-white">
                <span className="phm">Pages</span>
                <Icon category="utility" name="chevrondown" size="x-small" inverse />
              </button>
            </div>
            <span className="pam text-white">App Name</span>
            <div>
              <button className="pam dib brs border-white text-white">
                <Icon category="utility" name="back" size="x-small" inverse />
                <span className="phm">Back</span>
              </button>
              <button className="pam dib brs border-white text-white">
                <Icon category="utility" name="help" size="x-small" inverse />
                <span className="phm">Help</span>
              </button>
            </div>
          </section>

          <section className="df df-justify bg-white">
            <div className="pam">
              {this.renderHeaderActions()}
              {this.renderHeaderViews()}
            </div>
            <div className="pam">
              {this.renderHeaderSave()}
            </div>
          </section>
        </header>

        <main className="dg main-grid dg-stretch">
          <div id="components-sidebar" className="pam bg-white bas border-gray">
            <h2 className="slds-text-heading_small">Lightning Components</h2>
          </div>
          <div id="main-builder" className="mas mbn pam pbn bg-blue dg builder-grid dg-stretch">
            <div id="builder-header" className="builder-region">Header</div>
            <div id="builder-main-col" className="builder-region">Main Column</div>
            <div id="builder-small-col" className="builder-region">Side Column</div>
          </div>
          <div id="properties-sidebar" className="pam bg-white bas border-gray">
            <h2 className="slds-text-heading_small">Properties</h2>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
