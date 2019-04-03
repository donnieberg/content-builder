import {
  ADD_COMPONENT
} from './actionTypes';

export const addComponent = (newCanvas) => ({
  type: ADD_COMPONENT,
  newCanvas: newCanvas,
});
