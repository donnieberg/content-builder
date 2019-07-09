import {
  HEADER, COMPONENT_PANEL, CANVAS, PROPERTY_PANEL,
} from './constants';

// import {
//   UPDATE_FOCUSED_REGION
// } from './actionTypes';

const initialState = {
  test: "test",
  regions: [HEADER, COMPONENT_PANEL, CANVAS, PROPERTY_PANEL],
  currFocusedRegion: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default rootReducer;
