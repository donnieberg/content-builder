import React, { Component } from 'react';
import { Tabs as TabsWrapper, TabsPanel } from '@salesforce/design-system-react'

class Tabs extends Component {
  render() {
    return (
      <TabsWrapper>
        <TabsPanel label="Item One">Item One Content</TabsPanel>
        <TabsPanel label="Item Two">Item Two Content</TabsPanel>
        <TabsPanel label="Item Three">Item Three Content</TabsPanel>
      </TabsWrapper>
    );
  }
}

export default Tabs;
