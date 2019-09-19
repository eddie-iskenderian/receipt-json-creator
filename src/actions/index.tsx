import * as constants from '../constants';
import { PaymentInfo, BasketItem, OtherPayment } from '../types/receipts';

export type SetAttribute =
  SetTestCase
  | SetTotal
  | SetTax
  | SetPosId
  | SetExternalId 
  | SetBarcode 
  | SetReturns
  | SetPayments
  | SetOtherPayments
  | SetItems;

export interface SetTestCase {
  type: constants.SET_TEST_CASE;
  name: string;
}

export const setTestCase = (name: string): SetTestCase => ({
  type: constants.SET_TEST_CASE,
  name
})

export interface SetTax {
  type: constants.SET_TAX;
  tax: number;
}

export const setTax = (tax: number): SetTax => ({
  type: constants.SET_TAX,
  tax
});

export interface SetTotal {
  type: constants.SET_TOTAL;
  total: number;
}

export const setTotal = (total: number): SetTotal => ({
  type: constants.SET_TOTAL,
  total
});

export interface SetPosId {
  type: constants.SET_POS_ID;
  pos_id: string;
}

export const setPosId = (posId: string): SetPosId => ({
  type: constants.SET_POS_ID,
  pos_id: posId
});

export interface SetExternalId {
  type: constants.SET_EXTERNAL_ID;
  external_id: string;
}

export const setExternalId = (externalId: string) => ({
  type: constants.SET_EXTERNAL_ID,
  external_id: externalId
})

export interface SetBarcode {
  type: constants.SET_BARCODE;
  id: string
}

export const setBarcode = (id: string) => ({
  type: constants.SET_BARCODE,
  id
});

export interface SetReturns {
  type: constants.SET_RETURNS;
  returns: number;
}

export const setReturns = (returns: number) => ({
  type: constants.SET_RETURNS,
  returns
});

export interface SetPayments {
  type: constants.SET_PAYMENTS;
  payments: PaymentInfo[];
}

export const setPayments = (payments: PaymentInfo[]) => ({
  type: constants.SET_PAYMENTS,
  payments
});

export interface SetOtherPayments {
  type: constants.SET_OTHER_PAYMENTS;
  payments: OtherPayment[];
}

export const setOtherPayments = (payments: OtherPayment[]) => ({
  type: constants.SET_OTHER_PAYMENTS,
  payments
})

export interface SetItems {
  type: constants.SET_ITEMS;
  items: BasketItem[];
}

export const setItems = (items: BasketItem[]) => ({
  type: constants.SET_ITEMS,
  items
})