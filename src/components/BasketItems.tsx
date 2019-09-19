import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import * as _ from 'lodash';

import { ReceiptStore } from '../store';
import { setItems } from '../actions';

import { sanitiseFloat, sanitiseInt } from '../functions'
import { BasketItem, makePricing, makeBasketProduct } from '../types/receipts';

import '../App.css';

interface BasketProps {
  dispatch: Dispatch<Action>;
  items?: BasketItem[];
}

interface BasketState {
  values?: { amount: string, quantity: string, warranty: string }[];
}

const mapStateToProps = (state: ReceiptStore) => ({
  items: state.basket_items
});

const BasketItems: React.FC<BasketProps> = (props: BasketProps) => {
  const [state, setState] = useState({});
  const basketState = state as BasketState;

  return (
    <div className='App-component'>
      <div className='App-field'>Basket Items</div>
      <div>
        {
          (props.items || []).map((item: BasketItem, index) => {
            const ordinal = index;
            return (
              <div className='App-subcomponent' key={ ordinal }>
                <div></div>
                <div style={{ paddingLeft: '230px' }}>
                  <input type='submit' value='-' onClick={ event => {
                      const items = _.cloneDeep(props.items) || [];
                      items.splice(ordinal, 1);
                      const values = _.cloneDeep(basketState.values) || [];
                      values.splice(ordinal, 1);
                      setState({ values });
                      props.dispatch(setItems(items));
                    }
                  }></input>
                </div>
                <div className='App-field'>Name</div>
                <div className='App-input'>
                  <input type='text' onChange={ event => {
                      const items = _.cloneDeep(props.items!);
                      items[ordinal].value.name = event.target.value;
                      props.dispatch(setItems(items));
                    }
                  } value={ props.items![ordinal].value.name || '' }></input>
                </div>
                <div className='App-field'>Description</div>
                <div className='App-input'>
                  <input type='text' onChange={ event => {
                      const items = _.cloneDeep(props.items!);
                      items[ordinal].value.description = event.target.value;
                      items[ordinal].value.short_description = event.target.value;
                      props.dispatch(setItems(items));
                    }
                  } value={ props.items![ordinal].value.description || '' } placeholder={
                    props.items![ordinal].value.description === null ? 'null' : '' 
                  }></input>
                </div>
                <div className='App-field'>Quantity</div>
                <div className='App-input'>
                  <input type='text' value={ basketState.values![ordinal].quantity || '' } onChange={ event => {
                      let clean = sanitiseFloat(event.target.value);
                      if (clean === null) {
                        clean = basketState.values![ordinal].quantity || '';
                      }
                      const values = _.cloneDeep(basketState.values!);
                      values[ordinal].quantity = clean;
                      setState({ values });
                      const items = _.cloneDeep(props.items!);
                      items[ordinal].value.quantity_purchased = parseFloat(clean) || 0;
                      props.dispatch(setItems(items));
                    }
                  }></input>
                </div>
                <div className='App-field'>Total</div>
                <div className='App-input'>
                  <input type='text' value={ basketState.values![ordinal].amount || '' } onChange={ event => {
                      let clean = sanitiseFloat(event.target.value);
                      if (clean === null) {
                        clean = basketState.values![ordinal].amount || '';
                      }
                      const values = _.cloneDeep(basketState.values!);
                      values[ordinal].amount = clean;
                      setState({ values });
                      const items = _.cloneDeep(props.items!);
                      items[ordinal].value.pricing = makePricing({ price: parseFloat(clean) || 0 })
                      props.dispatch(setItems(items));
                    }
                  }></input>
                </div>
                <div className='App-field'>Warranty</div>
                <div className='App-input'>
                  <input type='text' value={ basketState.values![ordinal].warranty || '' } onChange={ event => {
                      let clean = sanitiseInt(event.target.value);
                      if (clean === null) {
                        clean = basketState.values![ordinal].warranty || '';
                      }
                      const values = _.cloneDeep(basketState.values!);
                      values[ordinal].warranty = clean;
                      setState({ values });
                      const items = _.cloneDeep(props.items!);
                      items[ordinal].value.warranty_period = parseInt(clean) || 0;
                      props.dispatch(setItems(items));
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
              const items = _.cloneDeep(props.items) || [];
              items.push({
                kind: 'product',
                value: makeBasketProduct({
                })
              });
              props.dispatch(setItems(items));
              const values = _.cloneDeep(basketState.values) || [];
              values.push({ amount: '', quantity: '', warranty: '' });
              setState({ values });
            } }></input>
        </div>
      </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(BasketItems);