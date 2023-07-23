import React, { useState } from 'react';
import './Form.css';

export default function Form({ addItemHandler }) {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleAddItem = () => {
    const newItem = {
      id: `${Math.random()}-${Date.now()}`,
      name: itemName,
      description: description,
      price: price,
      image: image
    };

    addItemHandler(newItem);
    // Reset the form inputs
    setItemName('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  const handleClearInputs = () => {
    // Reset the form inputs
    setItemName('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  return (
    <div className="form-container">
      <h2>Add Item to Inevntory</h2>
      <form>
        <div className="form-group">
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
      </form>
      <button className="add-button" type="button" onClick={handleAddItem}>
        Add Item
      </button>
      <button className="clear-button" type="button" onClick={handleClearInputs}>
        Clear Inputs
      </button>
    </div>
  );
}
