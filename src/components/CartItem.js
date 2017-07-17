import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ id, name, lineItems, total }) => (
  <li>
    {name}
    <ul>
      {lineItems.map(lineItem =>
        <li
          key={ lineItem.qty + '-' + lineItem.price }
        >
          {lineItem.qty} @ ${lineItem.price}
        </li>
      )}
    </ul>
    {total}
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
