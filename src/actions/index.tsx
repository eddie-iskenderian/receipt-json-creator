import * as constants from '../constants';

export type SetAttribute = SetTotal | SetTax;

export interface SetTotal {
  type: constants.SET_TOTAL;
  total: number;
}

export const setTotal = (total: number): SetTotal => ({
  type: constants.SET_TOTAL,
  total
});

export interface SetTax {
  type: constants.SET_TAX;
  tax: number;
}

export const setTax = (tax: number): SetTax => ({
  type: constants.SET_TAX,
  tax
});