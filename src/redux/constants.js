import Tabs from '../components/Tabs';
import Accordion from '../components/Accordion';

export const HEADER = 'HEADER';
export const COMPONENT_PANEL = 'COMPONENT_PANEL';
export const CANVAS = 'CANVAS';
export const PROPERTY_PANEL = 'PROPERTY_PANEL';

export const ALL_COMPONENTS = [
  {
    id: 'chatter',
    component: 'chatter',
    label: 'Chatter',
    value: 'chatter',
    rightIcon: {
      category: 'utility',
      name: 'tabset'
    }
  }, {
    id: 'tabs',
    component: Tabs,
    children: [],
    label: 'Tabs',
    value: 'tabs',
    rightIcon: {
      category: 'utility',
      name: 'layers'
    }
  }, {
    id: 'accordion',
    component: Accordion,
    children: [
      {
        panelIndex: 0,
        content: [],
        label: 'Label 1',
      }, {
        panelIndex: 1,
        content: [],
        label: 'Label 2',
      }, {
        panelIndex: 2,
        content: [],
        label: 'Label 3',
      }
    ],
    label: 'Accordion',
    value: 'accordion',
    rightIcon: {
      category: 'utility',
      name: 'chat'
    }
  }
];
