import * as constants from '../constants';
import { PaymentInfo } from '../types/receipts';

export type SetAttribute =
  SetTotal
  | SetTax
  | SetPosId
  | SetExternalId 
  | SetBarcode 
  | SetReturns
  | SetPayments;

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