import {
  HEADER, COMPONENT_PANEL, CANVAS, PROPERTY_PANEL
} from './constants';

import {
  ADD_COMPONENT
} from './actionTypes';

import Accordion from '../components/Accordion';
import Tabs from '../components/Tabs';

const initialState = {
  test: "test",
  regions: [HEADER, COMPONENT_PANEL, CANVAS, PROPERTY_PANEL],
  canvas: {
    header: {
      components: [
        {
          component: Accordion,
          id: '001',
          children: [
            {
              panelIndex: 0,
              component: 'chatter',
              label: 'Chatter'
            }
          ]
        }
      ],
    },
    main: {
      components: [
        {
          component: Tabs,
          id: '002',
          children: [
            {
              panelIndex: 0,
              component: 'chatter',
              label: 'Chatter'
            }
          ]
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
    case ADD_COMPONENT:
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
