import { combineReducers } from 'redux';
import inventoryItems from './inventoryItems';
import cart from './cart';

const wfBakeryApp = combineReducers({
  inventoryItems,
  cart
});

export default wfBakeryApp;