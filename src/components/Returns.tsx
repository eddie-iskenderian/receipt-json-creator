import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { ReceiptStore } from '../store';
import { setReturns } from '../actions';

import { sanitiseInt } from '../functions'

import '../App.css';

interface ReturnsProps {
  dispatch: Dispatch<Action>;
  return_period?: number|null;
}

interface ReturnsState {
  return_period?: string;
}

const mapStateToProps = (state: ReceiptStore) => ({
  return_period: state.return_period
});

const Returns: React.FC<ReturnsProps> = (props: ReturnsProps) => {
  const [state, setState] = useState({});
  const returnsState = state as ReturnsState;

  return (
    <div className='App-component'>
      <div className='App-field'>Return period</div>
      <div className='App-input'>
        <input type="text" value={ returnsState.return_period || '' } onChange={ (event) => {
            let clean = sanitiseInt(event.target.value);
            if (clean === null) {
              clean = returnsState.return_period || '';
            }
            setState({ return_period: clean });
            props.dispatch(setReturns(parseInt(clean, 10) || 0));
          }
        } placeholder={
          props.return_period === null ? 'null' : ''
        }></input>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Returns);