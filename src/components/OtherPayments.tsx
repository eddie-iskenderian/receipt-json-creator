import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import * as _ from 'lodash';

import { ReceiptStore } from '../store';
import { setOtherPayments } from '../actions';

import { sanitiseFloat } from '../functions'
import { OtherPayment, makeOtherPayment } from '../types/receipts';

import '../App.css';

interface OtherPaymentsProps {
  dispatch: Dispatch<Action>;
  payments?: OtherPayment[];
}

interface OtherPaymentsState {
  totals?: string[];
}

const mapStateToProps = (state: ReceiptStore) => ({
  payments: state.other_payments
});

const OtherPayments: React.FC<OtherPaymentsProps> = (props: OtherPaymentsProps) => {
  const [state, setState] = useState({});
  const paymentState = state as OtherPaymentsState;

  return (
    <div className='App-component'>
      <div className='App-field'>Other Payments</div>
      <div>
        {
          (props.payments || []).map((item: OtherPayment, index) => {
            const ordinal = index;
            return (
              <div className='App-subcomponent' key={ ordinal }>
                <div></div>
                <div style={{ paddingLeft: '230px' }}>
                  <input type='submit' value='-' onClick={ event => {
                      const payments = _.cloneDeep(props.payments) || [];
                      payments.splice(ordinal, 1);
                      const values = _.cloneDeep(paymentState.totals) || [];
                      values.splice(ordinal, 1);
                      setState({ values });
                      props.dispatch(setOtherPayments(payments));
                    }
                  }></input>
                </div>
                <div className='App-field'>Cash</div>
                <div className='App-field'></div>
                <div className='App-field'>Reference</div>
                <div className='App-input'>
                  <input type='text' onChange={ event => {
                      const payments = _.cloneDeep(props.payments!);
                      payments[ordinal].reference = event.target.value;
                      props.dispatch(setOtherPayments(payments));
                    }
                  } value={ props.payments![ordinal].reference || '' } placeholder={
                    props.payments![ordinal].reference === null ? 'null' : ''
                  }></input>
                </div>
                <div className='App-field'>Amount</div>
                <div className='App-input'>
                  <input type='text' value={ paymentState.totals![ordinal] || '' } onChange={ event => {
                      let clean = sanitiseFloat(event.target.value);
                      if (clean === null) {
                        clean = paymentState.totals![ordinal] || '';
                      }
                      const totals = _.cloneDeep(paymentState.totals!);
                      totals[ordinal] = clean;
                      setState({ totals });
                      const payments = _.cloneDeep(props.payments!);
                      payments[ordinal].amount = parseFloat(clean) || 0
                      props.dispatch(setOtherPayments(payments));
                    }
                  }></input>
                </div>
              </div>
            );
          })
        }
      <div></div>
      <div className='App-subcomponent'>
        <div className='App-input'>
          <input type='submit' value='+' onClick={ () => {
              const payments = _.cloneDeep(props.payments) || [];
              payments.push(makeOtherPayment({}));
              props.dispatch(setOtherPayments(payments));
              const totals = _.cloneDeep(paymentState.totals) || [];
              totals.push('');
              setState({ totals });
            } }></input>
        </div>
      </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(OtherPayments);