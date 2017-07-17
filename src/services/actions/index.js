import actionTypes from './actionTypes';

export const addToCart = (itemId) => ({
  type: actionTypes.ADD_TO_CART,
  id: itemId
});

export const removeFromCart = (itemId) => ({
  type: actionTypes.REMOVE_FROM_CART,
  id: itemId
});