import actionTypes from '../actions/actionTypes';
import { isInteger } from 'lodash';

/**
 *
 * @param oldQty
 * @param qtyChaneAmt
 * @returns {number}
 */
export const ensureCartItemQty = (oldQty, qtyChaneAmt) => {
  return Math.max(0, oldQty + qtyChaneAmt);
};

/**
 * Adds an item to the cart
 * @param state
 * @param id
 * @param qtyChaneAmt
 * @returns {*}
 */
export const updateItemCartQty = (state = [], id, qtyChaneAmt = 0) => {
  if(!isInteger(id)) {
    return state;
  }
  const existingItem = state.find((item) => {
    return item.id === id;
  });

  let newState;
  if(existingItem) {
    newState = state.map((item) => {
      return item.id === id ? { ...existingItem, qty: ensureCartItemQty(existingItem.qty, qtyChaneAmt)} : item;
    });
  } else {
    newState = [...state, { id , qty: ensureCartItemQty(0, qtyChaneAmt) }]
  }

  return newState.filter((item) => { return item.qty > 0 });
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
      return updateItemCartQty(state, action.id, 1);
    case actionTypes.REMOVE_FROM_CART:
      return updateItemCartQty(state, action.id, -1);
    default:
      return state
  }
};

export default cart;