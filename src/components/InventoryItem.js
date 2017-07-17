import React from 'react';
import PropTypes from 'prop-types';

const Item = ({ onAddToCart, imageURL, name, priceDescription }) => (
  <li className="inventory__item">
    <div className="inventory__item__image-box">
      <img src={imageURL} alt={name} className="full-width-image"/>
    </div>
    <div className="inventory__item__info">
      <div>
        <h2 className="h2 inventory__item__name">{name}</h2>
        {priceDescription}
      </div>

    </div>
    <div className="inventory__item__button-box">
      <button className="inventory__item__button button button--fill button--plus-button" onClick={onAddToCart}>&#43;</button>
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
