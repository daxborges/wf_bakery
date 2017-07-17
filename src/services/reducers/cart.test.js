import {
  ensureCartItemQty,
  updateItemCartQty
} from './cart';


describe('ensureQty', () => {

  it('it should never return anything less than 0', () => {
    expect(ensureCartItemQty(0, 1)).toEqual(1);
    expect(ensureCartItemQty(0, -1)).toEqual(0);
  });

  it('it should return a proper quantity', () => {
    expect(ensureCartItemQty(2, 1)).toEqual(3);
    expect(ensureCartItemQty(2, -1)).toEqual(1);
  });

});


describe('updateItemCartQty', () => {

  const itemId = 1;
  const oneItemCart = [{ id: itemId, qty: 3}];

  it('it should add a new item if one doesn\'t exist', () => {
    const cart = updateItemCartQty([], itemId, 1);
    expect(cart[0]).toEqual(expect.objectContaining({
      id: itemId,
      qty: 1
    }));
  });

  it('it shouldn\'t add a new item if decrementing a non existent id', () => {
    const cart = updateItemCartQty([], itemId, -1);
    expect(cart.length).toEqual(0);
  });

  it('it should change the quantity of an existing item', () => {
    expect(updateItemCartQty(oneItemCart, itemId, -1)[0].qty).toEqual(2);
    expect(updateItemCartQty(oneItemCart, itemId, 1)[0].qty).toEqual(4);
    expect(updateItemCartQty(oneItemCart, itemId, -2)[0].qty).toEqual(1);
    expect(updateItemCartQty(oneItemCart, itemId, 2)[0].qty).toEqual(5);
  });

  it('it should remove an item if the qty gets to 0', () => {
    expect(updateItemCartQty(oneItemCart, itemId, -3).length).toEqual(0);
    expect(updateItemCartQty(oneItemCart, itemId, -5).length).toEqual(0);
  });

});