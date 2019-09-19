import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { ReceiptStore } from '../store';
import Receipt from '../types/receipts';

import '../App.css';

interface JsonDumpProps {
  dispatch: Dispatch<Action>;
  receipt?: Receipt;
}

const mapStateToProps = (state: ReceiptStore) => ({
  receipt: state
});

const POS: React.FC<JsonDumpProps> = (props: JsonDumpProps) => {
  return (
    <div>
      <input type='submit' onClick={
        () => {
          const downloadButton = document.createElement("a");
          const file = new Blob([JSON.stringify(props.receipt, null, 2)], {type: "application/json"});
          downloadButton.href = URL.createObjectURL(file);
          downloadButton.download = props.receipt!.merchant || 'unknown';
          document.body.appendChild(downloadButton);
          downloadButton.click();
        }
      }></input>
    </div>
  );
}

export default connect(mapStateToProps)(POS);