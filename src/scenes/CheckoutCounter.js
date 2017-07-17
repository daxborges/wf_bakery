import { connect } from 'react-redux';
import { addToCart } from '../services/actions';
import Cart from '../components/Cart';

/**
 * Find an inventory item by its id
 * @param inventoryItems
 * @param id
 * @returns {*}
 */
export const getInventoryItem = (inventoryItems = [], id) => {
  return inventoryItems.find((item) => {
    return item.id === id;
  });
};

/**
 * Calculate the total price for any number of line items
 *
 * @param lineItems
 * @returns {*}
 */
export const calculateLineItemsTotal = (lineItems = []) => {
  return lineItems.reduce((total, lineItem) => {
    const lineItemPrice = (lineItem.qty * (lineItem.price * 100)) / 100;
    return total + lineItemPrice;
  }, 0);
};

/**
 * Get The line items for
 * @param inventoryItem
 * @param cartItem
 * @returns {Array.<*>}
 */
export const getCartItemLineItems = (inventoryItem, cartItem) => {
  const nonBulkQty = inventoryItem.bulkPricing ? cartItem.qty % inventoryItem.bulkPricing.amount : cartItem.qty;
  const bulkQty = inventoryItem.bulkPricing ? Math.floor(cartItem.qty / inventoryItem.bulkPricing.amount) : 0;
  const bulkPrice = inventoryItem.bulkPricing ? inventoryItem.bulkPricing.totalPrice : 0;
  return [
    { qty: nonBulkQty, price: inventoryItem.price },
    { qty: bulkQty, price: bulkPrice }
  ].filter((item) => item.qty !== 0);
};

/**
 * Get the line items and total for a cart item
 *
 * @param inventoryItem
 * @param cartItem
 * @returns {{lineItems: Array.<*>, total: *}}
 */
export const getCartItemPricingInfo = (inventoryItem, cartItem) => {
  const lineItems = getCartItemLineItems(inventoryItem, cartItem);

  return {
    lineItems,
    total: calculateLineItemsTotal(lineItems)
  }
};

/**
 * Get the formatted cart items with their line items and total price
 *
 * @param inventoryItems
 * @param cart
 * @returns {Array|Object|*}
 */
export const getCartItems = (inventoryItems, cart) => {
  return cart.map((cartItem) => {
    const inventoryItem = getInventoryItem(inventoryItems, cartItem.id);
    const cartItemPricingInfo = getCartItemPricingInfo(inventoryItem, cartItem);

    return {
      id: inventoryItem.id,
      name: inventoryItem.name,
      ...cartItemPricingInfo
    };
  });
};

/**
 * Get the grand total for all cart items
 * @param cartItems
 * @returns {*}
 */
export const getGrandTotal = (cartItems = []) => {
  return cartItems.reduce((total, pInfo) => {
    return total + pInfo.total
  }, 0);
};

export const mapStateToProps = (state) => {
  const cartItems = getCartItems(state.inventoryItems, state.cart);
  return {
    cartItems,
    grandTotal: getGrandTotal(cartItems)
  };
};

const mapDispatchToProps = {
  onAddToCartClick: addToCart
};

const CheckoutCounter = connect(
  mapStateToProps//,
  //mapDispatchToProps
)(Cart);

export default CheckoutCounter;
