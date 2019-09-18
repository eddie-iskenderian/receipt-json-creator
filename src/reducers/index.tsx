import { SetAttribute } from '../actions';
import { ReceiptStore, NullStore } from '../store';
import { SET_TOTAL, SET_TAX } from '../constants/index';

export const attributes = (state: ReceiptStore | undefined, action: SetAttribute): ReceiptStore => {
  if (!state) {
    return NullStore;
  }
  switch (action.type) {
    case SET_TOTAL:
      return { ...state, total_price: action.total };

    case SET_TAX:
      return { ...state, total_tax: action.tax };
   }
  return state;
};