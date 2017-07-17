import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ id, name, lineItems, total, onAddToCart, onRemoveFromCart }) => (
  <li className="cart-item">
    <div className="cart-item__header">
      <div>{name}</div>
      <div className="">
        <button className="button cart-item__button-left" onClick={onRemoveFromCart}>-</button>
        <button className="button cart-item__button-right" onClick={onAddToCart}>+</button>
      </div>
    </div>
    <ul>
      {lineItems.map(lineItem =>
        <li
          className="cart-item__line-item"
          key={ lineItem.qty + '-' + lineItem.price }
        >
          {lineItem.qty} x { lineItem.amount } @ ${lineItem.price}
        </li>
      )}
    </ul>
    <div className="cart-item__total">
      ${total}
    </div>
  </li>
)

CartItem.propTypes = {
  lineItems:  PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.string.isRequired,
    qty: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired
  })).isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired
};

export default CartItem;
