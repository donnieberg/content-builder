import {
  ADD_COMPONENT
} from './constants';

export const addComponent = (componentData, canvasRegion) => ({
  type: ADD_COMPONENT,
  componentData: componentData,
  canvasRegion: canvasRegion,
});
