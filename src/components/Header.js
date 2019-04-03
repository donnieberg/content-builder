import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  Icon,
} from '@salesforce/design-system-react';

class Header extends Component {
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
    );
  }
}

export default Header;
