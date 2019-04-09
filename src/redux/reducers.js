import React from 'react';
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
              content: null,
              label: 'Label 1',
            }, {
              panelIndex: 1,
              content: null,
              label: 'Label 2',
            }, {
              panelIndex: 2,
              content: null,
              label: 'Label 3',
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
              label: 'Label 1',
              content: null,
            }, {
              panelIndex: 1,
              label: 'Label 2',
              content: null,
            }, {
              panelIndex: 2,
              label: 'Label 3',
              content: null,
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
