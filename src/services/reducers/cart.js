import actionTypes from '../actions/actionTypes';
import { isInteger } from 'lodash';

/**
 * Adds an item to the cart
 * @param state
 * @param id
 * @returns {*}
 */
const addItemToCart = (state = [], id) => {
  if(!isInteger(id)) {
    return state;
  }
  const existingItem = state.find((item) => {
    return item.id === id;
  });

  if(existingItem) {
    return state.map((item) => {
      return item.id === id ? {...existingItem, qty: existingItem.qty + 1} : item;
    });
  } else {
    return [...state, { id , qty: 1 }]
  }
};

/**
 * Cart Reducer
 * @param state
 * @param action
 * @returns {*}
 */
const cart = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return addItemToCart(state, action.id);
    default:
      return state
  }
};

export default cart;