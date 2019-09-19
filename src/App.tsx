import React from 'react';
import { connect, Provider } from 'react-redux';

import Store, { ReceiptStore } from './store';

import POS from './components/POS';
import PaymentInfo from './components/PaymentInfo';
import BasketItems from './components/BasketItems';
import Barcode from './components/Barcode';
import Totals from './components/Totals';
import Returns from './components/Returns';

import './App.css';

interface AppProps {
  receipt?: {};
}

export const App: React.FC<AppProps> = (props: AppProps) => {
  return (
    <Provider store={ Store } >
      <div className="App">
        <POS/>
        <BasketItems/>
        <PaymentInfo/>
        <Barcode/>
        <Totals/>
        <Returns/>
      </div>
    </Provider>
  );
}

const mapStateToProps = (state: ReceiptStore, ownProps: AppProps) => {};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
