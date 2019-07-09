import Tabs from '../components/Tabs';
import Accordion from '../components/Accordion';

export const HEADER = 'HEADER';
export const COMPONENT_PANEL = 'COMPONENT_PANEL';
export const CANVAS = 'CANVAS';
export const PROPERTY_PANEL = 'PROPERTY_PANEL';

export const ALL_COMPONENTS = [
  {
    id: 'chatter',
    imageSrc: 'stencil_chatter.png',
    component: 'chatter',
    label: 'Chatter',
    value: 'chatter',
    rightIcon: {
      category: 'utility',
      name: 'chat'
    }
  }, {
    id: 'tabs',
    component: Tabs,
    panels: [
      {
        index: 0,
        name: 'Label 1',
        components: []
      }, {
        index: 1,
        name: 'Label 2',
        components: []
      }, {
        index: 2,
        name: 'Label 3',
        components: []
      },
    ],
    label: 'Tabs',
    value: 'tabs',
    rightIcon: {
      category: 'utility',
      name: 'tabset'
    }
  }, {
    id: 'accordion',
    component: Accordion,
    panels: [
      {
        index: 0,
        name: 'Label 1',
        components: [],
      }, {
        index: 1,
        name: 'Label 2',
        components: [],
      }, {
        index: 2,
        name: 'Label 3',
        components: [],
      },
    ],
    label: 'Accordion',
    value: 'accordion',
    rightIcon: {
      category: 'utility',
      name: 'layers'
    }
  }, {
    id: 'form',
    component: 'form',
    label: 'Form',
    imageSrc: 'stencil_inputs.png',
    value: 'form',
    rightIcon: {
      category: 'utility',
      name: 'record_update'
    }
  }, {
    id: 'fields',
    component: 'fields',
    label: 'Form Fields',
    imageSrc: 'stencil_formFields.png',
    value: 'fields',
    rightIcon: {
      category: 'utility',
      name: 'rows'
    }
  }
];
