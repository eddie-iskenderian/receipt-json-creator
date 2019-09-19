import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import * as _ from 'lodash';

import { ReceiptStore } from '../store';
import { setPayments } from '../actions';

import { sanitiseFloat } from '../functions'
import { PaymentInfo, makePaymentInfo } from '../types/receipts';

import '../App.css';

interface PaymentsProps {
  dispatch: Dispatch<Action>;
  payments?: PaymentInfo[];
}

interface PaymentState {
  totals?: string[];
}

const mapStateToProps = (state: ReceiptStore) => ({
  payments: state.payment_data
});

const Payments: React.FC<PaymentsProps> = (props: PaymentsProps) => {
  const [state, setState] = useState({});
  const paymentState = state as PaymentState;

  return (
    <div className='App-component'>
      <div className='App-field'>Payment Info</div>
      <div>
        {
          (props.payments || []).map((payment: PaymentInfo, index) => {
            const ordinal = index;
            return (
              <div className='App-subcomponent' key={ ordinal }>
                <div></div>
                <div style={{ paddingLeft: '230px' }}>
                  <input type='submit' value='-' onClick={ event => {
                      const payments = _.cloneDeep(props.payments) || [];
                      payments.splice(ordinal, 1);
                      const totals = _.cloneDeep(paymentState.totals) || [];
                      totals.splice(ordinal, 1);
                      setState({ totals });
                      props.dispatch(setPayments(payments));
                    }
                  }></input>
                </div>
                <div className='App-field'>MPAN</div>
                <div className='App-input'>
                  <input type='text' onChange={ event => {
                      const payments = _.cloneDeep(props.payments!);
                      payments[ordinal].card.pan.value = event.target.value;
                      setState({ totals: paymentState.totals });
                      props.dispatch(setPayments(payments));
                    }
                  } value={ props.payments![ordinal].card.pan.value || '' }></input>
                </div>
                <div className='App-field'>RRN</div>
                <div className='App-input'>
                  <input type='text' onChange={ event => {
                      const payments = _.cloneDeep(props.payments!);
                      payments[ordinal].rrn = event.target.value;
                      setState({ totals: paymentState.totals });
                      props.dispatch(setPayments(payments));
                    }
                  } value={ props.payments![ordinal].rrn || '' } placeholder={
                    props.payments![ordinal].rrn === null ? 'null' : ''
                  }></input>
                </div>
                <div className='App-field'>STAN</div>
                <div className='App-input'>
                  <input type='text' onChange={ event => {
                      const payments = _.cloneDeep(props.payments!);
                      payments[ordinal].stan = event.target.value;
                      setState({ totals: paymentState.totals });
                      props.dispatch(setPayments(payments));
                    }
                  } value={ props.payments![ordinal].stan || '' } placeholder={
                    props.payments![ordinal].stan === null ? 'null' : ''
                  }></input>
                </div>
                <div className='App-field'>Date</div>
                <div className='App-input'>
                  <input type='text' onChange={ event => {
                      const payments = _.cloneDeep(props.payments!);
                      payments[ordinal].transaction_date = event.target.value;
                      setState({ totals: paymentState.totals });
                      props.dispatch(setPayments(payments));
                    }
                  } value={ props.payments![ordinal].transaction_date || '' }></input>
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
                      const payments = _.cloneDeep(props.payments!);
                      payments[ordinal].total = parseFloat(clean) || 0;
                      setState({ totals });
                      props.dispatch(setPayments(payments));
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
              payments.push(makePaymentInfo({}));
              props.dispatch(setPayments(payments));
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

export default connect(mapStateToProps)(Payments);