import actionTypes from './actionTypes';

export const addToCart = (itemId) => ({
  type: actionTypes.ADD_TO_CART,
  id: itemId
});