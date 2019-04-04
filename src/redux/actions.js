import {
  ADD_COMPONENT
} from './actionTypes';

export const addComponent = (region, newRegionData) => ({
  type: ADD_COMPONENT,
  region: region,
  newRegionData: newRegionData,
});
