import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { attributes } from '../reducers';
import { SetAttribute } from '../actions';

import { Receipt } from '../types/receipts'

export const Store = createStore<ReceiptStore, SetAttribute, null, any>(
  attributes,
  /* {
    receipt: {}
  }, */
  composeWithDevTools()
);

export type ReceiptStore = Receipt;
