import React from 'react'
import PropTypes from 'prop-types'
import CartItem from './CartItem';

const Cart = ({ cartItems, grandTotal, onAddToCart, onRemoveFromCart }) => {
  const checkoutClick = () => {
    window.alert('Not the most robust checkout');
  }

  if (cartItems.length) {
    return (
      <div className="cart">
        <div className="cart__header">
          <h2 className="h2">Cart</h2>
        </div>
        <ul className="cart__body">
          {cartItems.map(cartItem =>
            <CartItem
              key={cartItem.id}
              {...cartItem}
              onAddToCart={() => onAddToCart(cartItem.id)}
              onRemoveFromCart={() => onRemoveFromCart(cartItem.id)}
            />
          )}
        </ul>
        <div className="cart__footer">
          <div className="h3 cart__total">Total: ${grandTotal}</div>
          <button
            className="button cart__checkout-button"
            onClick={checkoutClick}>Checkout</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cart">
        <div className="cart__header">
          <h2 className="h2">Cart</h2>
        </div>
        <div className="cart__body">
          <b>Your cart is empty</b>
        </div>
        <div className="cart__footer">
        </div>
      </div>);
  }
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    lineItems: PropTypes.arrayOf(PropTypes.shape({
      price: PropTypes.string,
      qty: PropTypes.number,
      amount: PropTypes.number
    })),
    name: PropTypes.string,
    total: PropTypes.number
  })),
  grandTotal: PropTypes.number.isRequired
};


export default Cart;