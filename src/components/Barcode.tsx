import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { ReceiptStore } from '../store';
import { setBarcode } from '../actions';

import '../App.css';

interface BarcodeProps {
  dispatch: Dispatch<Action>;
  id?: string;
}

const mapStateToProps = (state: ReceiptStore) => ({
    id: state.barcode ? state.barcode.id : ''
});

const Barcode: React.FC<BarcodeProps> = (props: BarcodeProps) => {
  return (
    <div className='App-component'>
      <div className='App-field'>Barcode</div>
      <div className='App-input'>
        <input type='text' onChange={ event => props.dispatch(setBarcode(event.target.value)) }></input>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Barcode);