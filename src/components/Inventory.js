import React from 'react'
import PropTypes from 'prop-types'
import Item from './InventoryItem';

const Inventory = ({ inventoryItems, onAddToCart }) => (
  <ul>
    {inventoryItems.map(item =>
      <Item
        key={item.id}
        {...item}
        onAddToCart={() => onAddToCart(item.id)}
      />
    )}
  </ul>
);

Inventory.propTypes = {
  inventoryItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    priceDescription: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default Inventory;