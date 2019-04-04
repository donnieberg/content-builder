import React, { Component } from 'react';
import { Tabs as TabsWrapper, TabsPanel } from '@salesforce/design-system-react'

const tabsContent = [
  {
    id: '1',
    content: 'Item One Content',
    label: 'Item One',
  }, {
    id: '2',
    content: 'Item Two Content',
    label: 'Item Two',
  }, {
    id: '3',
    content: 'Item Three Content',
    label: 'Item Three',
  }
];

class Tabs extends Component {
  render() {
    return (
      <TabsWrapper>
        {
          tabsContent.map((item, i) => (
            <TabsPanel
              id={item.id}
              key={item.id}
              label={item.label}
            >
              {item.content}
            </TabsPanel>
          ))
        }
      </TabsWrapper>
    );
  }
}

export default Tabs;
