import React from 'react';
import { connect, Provider } from 'react-redux';

import Store, { ReceiptStore } from './store';

import TestCase from './components/TestCase';
import POS from './components/POS';
import PaymentInfo from './components/PaymentInfo';
import OtherPayments from './components/OtherPayments';
import BasketItems from './components/BasketItems';
import Barcode from './components/Barcode';
import Totals from './components/Totals';
import Returns from './components/Returns';

import './App.css';
import JsonDump from './components/JsonDump';

interface AppProps {
  receipt?: {};
}

export const App: React.FC<AppProps> = (props: AppProps) => {
  return (
    <Provider store={ Store } >
      <div className="App">
        <TestCase/>
        <POS/>
        <BasketItems/>
        <PaymentInfo/>
        <OtherPayments/>
        <Barcode/>
        <Totals/>
        <Returns/>
        <JsonDump/>
      </div>
    </Provider>
  );
}

const mapStateToProps = (state: ReceiptStore, ownProps: AppProps) => {};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
