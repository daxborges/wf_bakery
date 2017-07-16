import React from 'react';
import PropTypes from 'prop-types';

const Item = ({ onAddToCart, imageURL, name, priceDescription }) => (
  <li>
    <div>
      <img src={imageURL} alt={name}/>
    </div>
    <div>
      {name}<br />
      {priceDescription}
      <button onClick={onAddToCart}>Add To Cart</button>
    </div>
  </li>
)

Item.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  priceDescription: PropTypes.string.isRequired
}

export default Item
