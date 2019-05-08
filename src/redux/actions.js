import {
  UPDATE_REGION
} from './actionTypes';

export const updateRegion = (region, newRegionData) => ({
  type: UPDATE_REGION,
  region: region,
  newRegionData: newRegionData,
});
