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
    total: state.total_price,
    tax: state.total_tax
});

const Totals: React.FC<TotalProps> = (props: TotalProps) => {
  const [state, setState] = useState({});
  const totalState = state as TotalState;

  return (
    <div className='App-component'>
      <div className='App-field'>Tax</div>
      <div className='App-input'>
        <input type="text" value={ totalState.tax || '' } onChange={ (event) => {
            let clean = sanitiseFloat(event.target.value);
            if (clean === null) {
              clean = totalState.tax || '';
            }
            setState({ tax: clean });
            props.dispatch(setTax(parseFloat(clean) || 0));
          }
        }></input>
      </div>
      <div className='App-field'>Total</div>
      <div className='App-input'>
        <input type="text" value={ totalState.total || '' } onChange={ (event) => {
            let clean = sanitiseFloat(event.target.value);
            if (clean === null) {
              clean = totalState.total || '';
            }
            setState({ total: clean });
            props.dispatch(setTotal(parseFloat(clean) || 0));
          }
        }></input>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Totals);