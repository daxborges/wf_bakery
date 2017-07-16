import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import App from './App';
import reducer from './services/reducers';
import products from './services/products-data';

const store = createStore(reducer, {
  inventoryItems: products.treats
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);