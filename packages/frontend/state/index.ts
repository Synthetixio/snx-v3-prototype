import { CollateralType } from '../utils/constants';
import { atom } from 'recoil';

export const collateralTypesState = atom<Array<CollateralType>>({
  key: 'collateralTypes',
  default: [],
});

export const chainIdState = atom({
  key: 'localChainId',
  default: 0,
});
