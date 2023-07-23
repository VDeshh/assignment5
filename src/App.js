import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addItem, deleteItem, editItem } from './actions';
import Form from './components/Form';
import ShowAllCards from './ShowAllCards';
import InventoryCount from './components/InventoryCount';
import Navbar from './components/Navbar';
import { FaSearch } from 'react-icons/fa';
import './App.css';

function App(props) {
  const { cards, addItem, deleteItem, editItem } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/inventory');
        const data = await response.json();
        data.forEach(item => addItem(item));
      } catch (error) {
        console.error('Error retrieving inventory:', error);
      }
    };

    fetchInventory();
  }, [addItem]);

  const handleAddItem = async (item) => {
    try {
      const response = await fetch('http://localhost:3000/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      window.location.reload();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id); // Add this line to check the id.
    try {
      const response = await fetch(`http://localhost:3000/api/inventory/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) { // Check if response went through
        throw Error(response.statusText);
      }
      // If response is ok then remove item from state
      deleteItem(id);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  

  const handleEdit = async (id, updatedItem) => {
    try {
      const response = await fetch(`http://localhost:3000/api/inventory/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await response.json();
        editItem(id, data);
      }

    } catch (error) {
      console.error('Error editing item:', error);
    }
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  let filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === 'price_asc') {
    filteredCards = filteredCards.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price_desc') {
    filteredCards = filteredCards.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <Navbar />
      <Form addItemHandler={handleAddItem} />
      <br />
      <br />
      <InventoryCount />
      <br />
      <br />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search cards"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="search-icon">
          <FaSearch />
        </div>
      </div>
      <div className="sort-container">
        <label className="sort-label" htmlFor="sort-dropdown">Sort by:</label>
        <select
          id="sort-dropdown"
          value={sortOption}
          onChange={handleSortChange}
          className="sort-dropdown"
        >
          <option value="">Select an option</option>
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
        </select>
      </div>
      <ShowAllCards cards={filteredCards} deleteHandler={handleDelete} editHandler={handleEdit} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
    deleteItem: (id) => dispatch(deleteItem(id)),
    editItem: (id, updatedItem) => dispatch(editItem(id, updatedItem))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
