import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { ReceiptStore } from '../store';
import { setTotal, setTax } from '../actions';

import { sanitiseFloat } from '../functions'

import '../App.css';

interface TotalProps {
  dispatch: Dispatch<Action>;
  tax?: number;
  total?: number;
}

interface TotalState {
  tax?: string;
  total?: string
}

const mapStateToProps = (state: ReceiptStore) => ({
    TotalProps: state.total_price
});

const Totals: React.FC<TotalProps> = (props: TotalProps) => {
  const [state, setState] = useState({});
  const totalState = state as TotalState;

  return (
    <div className='App-component'>
      <div className='App-field'>Tax</div>
      <div className='App-input'>
        <input type="text" value={ totalState.tax || '' } onChange={ (event) => {
            const next = sanitiseFloat(event.target.value) || totalState.tax || '';
            setState({ tax: next });
            props.dispatch(setTax(parseFloat(next) || 0));
          }
        }></input>
      </div>
      <div className='App-field'>Total</div>
      <div className='App-input'>
        <input type="number" value={ totalState.total || '' } onChange={ (event) => {
            const next = sanitiseFloat(event.target.value) || totalState.total || '';
            setState({ total: next });
            props.dispatch(setTotal(parseFloat(next) || 0));
          }
        }></input>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Totals);