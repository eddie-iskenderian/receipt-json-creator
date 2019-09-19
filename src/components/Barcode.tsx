import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { ReceiptStore } from '../store';
import { setBarcode } from '../actions';

import '../App.css';

interface BarcodeProps {
  dispatch: Dispatch<Action>;
  id?: string|null;
}

const mapStateToProps = (state: ReceiptStore) => ({
    id: state.barcode === null ? null : state.barcode.id
});

const Barcode: React.FC<BarcodeProps> = (props: BarcodeProps) => {
  return (
    <div className='App-component'>
      <div className='App-field'>Barcode</div>
      <div className='App-input'>
        <input type='text' value={ props.id || '' } onChange={
          event => props.dispatch(setBarcode(event.target.value))
        } placeholder={
          props.id === null ? 'null' : ''
        }></input>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Barcode);