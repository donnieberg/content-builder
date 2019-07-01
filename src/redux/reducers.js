import {
  HEADER, COMPONENT_PANEL, CANVAS, PROPERTY_PANEL,
  CANVAS_HEADER, CANVAS_MAIN, CANVAS_SIDEBAR,
} from './constants';

import {
  UPDATE_REGION,
  UPDATE_FOCUSED_REGION
} from './actionTypes';

import Accordion from '../components/Accordion';
import Tabs from '../components/Tabs';

const initialState = {
  test: "test",
  regions: [HEADER, COMPONENT_PANEL, CANVAS, PROPERTY_PANEL],
  currFocusedRegion: null,
  canvasRegions: [CANVAS_HEADER, CANVAS_MAIN, CANVAS_SIDEBAR],
  canvas: {
    header: {
      components: [
        {
          component: Accordion,
          id: '001',
          value: 'accordion',
          children: [
            {
              panelIndex: 0,
              component: 'chatter',
              label: 'Chatter',
              id: '003',
              imageSrc: 'stencil_chatter.png',
              value: 'chatter',
            }
          ]
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
          children: [
            {
              panelIndex: 0,
              component: 'chatter',
              label: 'Chatter',
              id: '004',
              imageSrc: 'stencil_chatter.png',
              value: 'chatter',
            }, {
              panelIndex: 1,
              component: 'chatter',
              label: 'Chatter',
              id: '006',
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
          ]
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
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REGION:
      return {
        ...state,
        canvas: {
          ...state.canvas,
          [action.region]: action.newRegionData
        }
      }
    default:
      return state;
  }
};

export default rootReducer;
