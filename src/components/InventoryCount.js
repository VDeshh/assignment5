import React from 'react';
import { connect } from 'react-redux';
import './InventoryCount.css';


function InventoryCount({ itemCount }) {
  return (
    <div className="inventory-count-container">
      <h2>Inventory Count: {itemCount}</h2>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    itemCount: state.cards.length
  };
};

export default connect(mapStateToProps)(InventoryCount);
