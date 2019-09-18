import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { ReceiptStore } from '../store';
import { setPosId, setExternalId } from '../actions';

import '../App.css';

interface PosProps {
  dispatch: Dispatch<Action>;
  pos_id?: string;
  external_id?: string;
}

const mapStateToProps = (state: ReceiptStore) => ({
    pos_id: state.pos_id || '',
    external_id: state.external_id
});

const POS: React.FC<PosProps> = (props: PosProps) => {
  return (
    <div className='App-component'>
      <div className='App-field'>POS Id</div>
      <div className='App-input'>
        <input type='text' onChange={ event => props.dispatch(setPosId(event.target.value)) }></input>
      </div>
      <div className='App-field'>External Id</div>
      <div className='App-input'>
        <input type='text' onChange={ event => props.dispatch(setExternalId(event.target.value)) }></input>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(POS);