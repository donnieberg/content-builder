import Accordion from './components/Accordion';
import Tabs from './components/Tabs';

export const initComponents = {
  header: {
    components: [
      {
        component: Accordion,
        id: '001',
        value: 'accordion',
        panels: [
          {
            index: 0,
            name: 'Label 1',
            components: [
              {
                panelIndex: 0,
                component: 'chatter',
                label: 'Chatter',
                id: '003',
                imageSrc: 'stencil_chatter.png',
                value: 'chatter',
              }
            ]
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
      }
    ],
  },
  main: {
    components: [
      {
        component: 'form',
        label: 'Form',
        id: '008',
        imageSrc: 'stencil_inputs.png',
        value: 'form',
      }, {
        component: Tabs,
        id: '002',
        value: 'tabs',
        panels: [
          {
            index: 0,
            name: 'Label 1',
            components: [
              {
                panelIndex: 0,
                component: 'chatter',
                label: 'Chatter',
                id: '004',
                imageSrc: 'stencil_chatter.png',
                value: 'chatter',
              }, {
                panelIndex: 0,
                component: 'fields',
                label: 'Form Fields',
                id: '005',
                imageSrc: 'stencil_formFields.png',
                value: 'fields',
              }
            ],
          }, {
            index: 1,
            name: 'Label 2',
            components: [
              {
                panelIndex: 1,
                component: 'chatter',
                label: 'Chatter',
                id: '006',
                imageSrc: 'stencil_chatter.png',
                value: 'chatter',
              }
            ]
          }, {
            index: 2,
            name: 'Label 3',
            components: []
          },
        ],
      }, {
        component: 'form',
        label: 'Form',
        id: '007',
        imageSrc: 'stencil_inputs.png',
        value: 'form',
      }
    ],
  },
  sidebar: {
    components: [],
  },
}; 