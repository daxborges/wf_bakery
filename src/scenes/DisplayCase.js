import { connect } from 'react-redux';
import { addToCart } from '../services/actions';
import Inventory from '../components/Inventory';

const formatInventoryItems = (inventoryItems) => {
  return inventoryItems.map((item) => {
    // Clone the item to avoid mutation
    return {
      ...item,
      priceDescription: item.bulkPricing ? `$${item.price} or ${item.bulkPricing.amount} for $${item.bulkPricing.totalPrice}` : `$${item.price}`
    };
  });
};

const mapStateToProps = (state) => ({
  inventoryItems: formatInventoryItems(state.inventoryItems)
});

const mapDispatchToProps = {
  onAddToCart: addToCart
};

const DisplayCase = connect(
  mapStateToProps,
  mapDispatchToProps
)(Inventory);

export default DisplayCase;
