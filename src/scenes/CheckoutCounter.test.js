import {
  getInventoryItem,
  calculateLineItemsTotal,
  getCartItemLineItems,
  getCartItemPricingInfo,
  getCartItems,
  getGrandTotal
} from './CheckoutCounter';
import productData from '../services/products-data';


const inventoryItems = productData.treats;

////////////////////////////////
// TEST CONSTANTS
const itemIdsByName = {
  brownie: 1,
  cheesecake: 2,
  cookie: 3,
  donut: 4
};
const nonBulkCartItemCheescake = { id: itemIdsByName.cheesecake, qty: 4 };
const bulkCartItemBrownie = { id: itemIdsByName.brownie, qty: 4 };
const complexBulkCartItemBrownie = { ...bulkCartItemBrownie, qty: (bulkCartItemBrownie.qty * 4) + 3 };
const nonBulkInventoryItemCheescake = getInventoryItem(inventoryItems, nonBulkCartItemCheescake.id);
const bulkInventoryItemBrownie = getInventoryItem(inventoryItems, bulkCartItemBrownie.id);
////////////////////////////////


describe('getInventoryItem', () => {

  it('should find an inventory item if there\'s an id in the inventory that matches', () => {
    expect(getInventoryItem(inventoryItems, 1)).toEqual(expect.objectContaining({
      'id': 1,
      'name': 'Brownie',
      'imageURL': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHdr1eTXEMs68Dx-b_mZT0RpifEQ8so6A1unRsJlyJIPe0LUE2HQ',
      'price': 2.00,
      'bulkPricing': {
        'amount': 4,
        'totalPrice': 7.00
      }
    }));
  });

  it('should return undefined if it can\'t find anything', () => {
    expect(getInventoryItem(inventoryItems, null)).toBeUndefined();
    expect(getInventoryItem(inventoryItems, 10)).toBeUndefined();
  });

});


describe('calculateLineItemsTotal', () => {

  it('should handle multiple line items', () => {
    expect(calculateLineItemsTotal([
      {qty: 10, price: 10.00},
      {qty: 5, price: 5.50}
    ])).toEqual(127.50);
  });

  it('should handle floating point math', () => {
    expect(calculateLineItemsTotal([
      {qty: 2, price: 0.20},
      {qty: 3, price: 0.10},
    ])).toBe(0.7);
  });

});


describe('getCartItemLineItems', () => {

  it('should give back one line item for non bulk items', () => {
    expect(getCartItemLineItems(nonBulkInventoryItemCheescake, nonBulkCartItemCheescake).length).toEqual(1);
  });

  it('should give back one line items for bulk items that are of perfect count', () => {
    expect(getCartItemLineItems(bulkInventoryItemBrownie, bulkCartItemBrownie).length).toEqual(1);
  });

  it('should give back two line items for bulk items that aren\'t of perfect count', () => {
    expect(getCartItemLineItems(bulkInventoryItemBrownie, complexBulkCartItemBrownie).length).toEqual(2);
  });

  it('should properly split bulk item quantities', () => {
    const lineItems = getCartItemLineItems(bulkInventoryItemBrownie, complexBulkCartItemBrownie);
    expect(lineItems[0].qty).toEqual(3);
    expect(lineItems[1].qty).toEqual(4);
  });

  it('should properly attribute prices to each line item', () => {
    const lineItems = getCartItemLineItems(bulkInventoryItemBrownie, complexBulkCartItemBrownie);
    expect(lineItems[0].price).toEqual(2.00);
    expect(lineItems[1].price).toEqual(7.00);
  });

});


describe('getCartItemPricingInfo', () => {

  it('should give back a proper total prices for non bulk', () => {
    expect(getCartItemPricingInfo(nonBulkInventoryItemCheescake, nonBulkCartItemCheescake).total).toEqual(32);
  });

  it('should give back a proper total prices for bulk', () => {
    expect(getCartItemPricingInfo(bulkInventoryItemBrownie, bulkCartItemBrownie).total).toEqual(7);
  });

  it('should give back a proper total prices for complex bulk', () => {
    expect(getCartItemPricingInfo(bulkInventoryItemBrownie, complexBulkCartItemBrownie).total).toEqual(34);
  });

});


describe('getCartItems', () => {

  it('should give back the same number of cart items as it got', () => {
    const basicCart = getCartItems(inventoryItems,
      [nonBulkCartItemCheescake, bulkCartItemBrownie]
    );

    expect(basicCart.length).toEqual(2);
  });

  it('should give back items formatted properly', () => {
    const basicCart = getCartItems(inventoryItems,
      [nonBulkCartItemCheescake]
    );
    const cartItem = basicCart[0];

    expect(cartItem).toEqual(expect.objectContaining({
      'id': 2,
      'lineItems': [{
        'price': 8,
        'qty': 4
      }],
      'name': 'Key Lime Cheesecake', 
      'total': 32}));
  });

});

describe('getGrandTotal', () => {

  it('should give a price of 16.25 for Cookie, Brownie x 4, Cheescake', () => {
    const cartItems = getCartItems(inventoryItems, [
      { id: itemIdsByName.cookie, qty: 1},
      { id: itemIdsByName.brownie, qty: 4},
      { id: itemIdsByName.cheesecake, qty: 1}
    ]);

    expect(getGrandTotal(cartItems)).toBe(16.25);
  });

  it('should give a price of 8.50 for Cookie, Brownie x 4, Cheescake', () => {
    const cartItems = getCartItems(inventoryItems, [
      { id: itemIdsByName.cookie, qty: 8}
    ]);

    expect(getGrandTotal(cartItems)).toBe(8.50);
  });

  it('should give a price of 12.25 for Cookie, Brownie, Cheescake, Donut x 2', () => {
    const cartItems = getCartItems(inventoryItems, [
      { id: itemIdsByName.cookie, qty: 1},
      { id: itemIdsByName.brownie, qty: 1},
      { id: itemIdsByName.cheesecake, qty: 1},
      { id: itemIdsByName.donut, qty: 2}
    ]);

    expect(getGrandTotal(cartItems)).toBe(12.25);
  });

});

