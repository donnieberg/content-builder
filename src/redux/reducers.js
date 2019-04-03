import {
  HEADER, COMPONENT_PANEL, CANVAS, PROPERTY_PANEL
} from './constants';

import {
  ADD_COMPONENT
} from './actionTypes';

import Accordion from '../components/Accordion';

const initialState = {
  test: "test",
  regions: [HEADER, COMPONENT_PANEL, CANVAS, PROPERTY_PANEL],
  canvas: {
    header: {
      components: [
        {
          component: Accordion,
          children: [
            {
              panelIndex: 0,
              content: 'Panel 1',
              label: 'Label 1',
            }, {
              panelIndex: 1,
              content: 'Panel 2',
              label: 'Label 2',
            }, {
              panelIndex: 2,
              content: 'Panel 3',
              label: 'Label 3',
            }
          ]
        }
      ],
    },
    main: {
      components: [],
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
        canvas: action.newCanvas
      }
    default:
      return state;
  }
};

export default rootReducer;
