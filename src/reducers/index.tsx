import { SetAttribute } from '../actions';
import { ReceiptStore, NullStore } from '../store';
import {
  SET_TOTAL,
  SET_TAX,
  SET_POS_ID,
  SET_EXTERNAL_ID,
  SET_BARCODE,
  SET_RETURNS,
  SET_PAYMENTS } from '../constants/index';
import { makeBarcode } from '../types/receipts';

export const attributes = (state: ReceiptStore | undefined, action: SetAttribute): ReceiptStore => {
  if (!state) {
    return NullStore;
  }
  switch (action.type) {
    case SET_TOTAL:
      return { ...state, total_price: action.total };

    case SET_TAX:
      return { ...state, total_tax: action.tax };

    case SET_POS_ID:
      return { ...state, pos_id: action.pos_id };

    case SET_EXTERNAL_ID:
      return { ...state, external_id: action.external_id }

    case SET_BARCODE:
      return { ...state, barcode: makeBarcode({
          id: action.id
        })
      };

    case SET_RETURNS:
      return { ...state, return_period: action.returns } ;

    case SET_PAYMENTS:
      return { ...state, payment_data: action.payments }
   }
  return state;
};