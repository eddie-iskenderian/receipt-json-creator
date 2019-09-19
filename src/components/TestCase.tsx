import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { ReceiptStore } from '../store';
import { setTestCase } from '../actions';

import '../App.css';

interface TestCaseProps {
  dispatch: Dispatch<Action>;
  merchant?: string;
}

const mapStateToProps = (state: ReceiptStore) => ({
  merchant: state.merchant
});

const POS: React.FC<TestCaseProps> = (props: TestCaseProps) => {
  return (
    <div className='App-component'>
      <div className='App-field'>Test Case</div>
      <div className='App-input'>
        <input type='text' value={ props.merchant || '' } onChange={
          event => props.dispatch(setTestCase(event.target.value))
        }></input>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(POS);