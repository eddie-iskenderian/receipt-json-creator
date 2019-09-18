import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { attributes } from '../reducers';
import { SetAttribute } from '../actions';

import Receipt, { makeReceipt } from '../types/receipts';

export type ReceiptStore = Receipt;

export const NullStore: ReceiptStore = makeReceipt({});

const Store = createStore<ReceiptStore, SetAttribute, null, any>(
  attributes,
  /* {
    receipt: {}
  }, */
  composeWithDevTools()
);

export default Store;
