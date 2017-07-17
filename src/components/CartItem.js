import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ id, name, lineItems, total }) => (
  <li className="cart-item">
    <div className="cart-item__header">{name}</div>
    <ul>
      {lineItems.map(lineItem =>
        <li
          className="cart-item__line-item"
          key={ lineItem.qty + '-' + lineItem.price }
        >
          {lineItem.qty} @ ${lineItem.price}
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
    price: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired
  })).isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired
};

export default CartItem;
