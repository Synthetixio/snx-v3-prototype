import { collateralTypes } from '../utils/constants';
import { atom } from 'recoil';

export const collateralTypesState = atom({
  key: 'collateralTypes',
  default: collateralTypes,
});

export const chainIdState = atom({
  key: 'localChainId',
  default: 1,
});
