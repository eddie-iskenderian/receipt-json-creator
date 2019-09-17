import React from 'react';
import { connect, Provider } from 'react-redux';

import { Store, ReceiptStore } from './store';

import './App.css';
import Totals from './components/Totals';

interface AppProps {
  receipt?: {};
}

export const App: React.FC<AppProps> = (props: AppProps) => {
  return (
    <Provider store={ Store } >
      <div className="App">
        <Totals/>
      </div>
    </Provider>
  );
}

const mapStateToProps = (state: ReceiptStore, ownProps: AppProps) => {};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
