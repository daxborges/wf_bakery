import React from 'react'
import PropTypes from 'prop-types'
import CartItem from './CartItem';

const Cart = ({ cartItems, grandTotal }) => {
  if (cartItems.length) {
    return (
      <div>
        <ul>
          {cartItems.map(cartItem =>
            <CartItem
              key={cartItem.id}
              {...cartItem}
            />
          )}
        </ul>
        Total: ${grandTotal}
      </div>
    );
  } else {
    return (
      <div>
        <b>Your cart is empty</b>
      </div>);
  }
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    lineItems: PropTypes.arrayOf(PropTypes.shape({
      price: PropTypes.number,
      qty: PropTypes.number
    })),
    name: PropTypes.string,
    total: PropTypes.number
  })),
  grandTotal: PropTypes.number.isRequired
};


export default Cart;