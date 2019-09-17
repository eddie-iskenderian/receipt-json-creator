import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { ReceiptStore } from '../store';
import { setTotal, setTax } from '../actions';

import '../App.css';
interface TotalProps {
  dispatch: Dispatch<Action>;
  total?: number;
}

const mapStateToProps = (state: ReceiptStore) => ({
    TotalProps: state.receipt.total
});

const Totals: React.FC<TotalProps> = (props: TotalProps) => {
  return (
    <div className='App-component'>
      <div className='App-field'>Tax</div>
      <div className='App-input'>
        <input type="number" onChange={ (event) => props.dispatch(setTax(parseFloat(event.target.value) || 0))  }></input>
      </div>
      <div className='App-field'>Total</div>
      <div className='App-input'>
        <input type="number" onChange={ (event) => props.dispatch(setTotal(parseFloat(event.target.value) || 0))  }></input>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Totals);