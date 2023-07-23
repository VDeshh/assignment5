import React, { useState } from 'react';
import { Button } from 'react-bootstrap-buttons';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import { DetailedView } from './DetailedView';

export function Card({ card, deleteHandler, editHandler }) {
  console.log(card);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(card.name);
  const [editedDescription, setEditedDescription] = useState(card.description);
  const [editedPrice, setEditedPrice] = useState(card.price);

  const moreDetails = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const {_id, ...cardWithoutId} = card; // Exclude the _id field
    
    const updatedCard = {
      ...cardWithoutId,
      name: editedName,
      description: editedDescription,
      price: editedPrice,
    };
  
    editHandler(_id, updatedCard); // Pass the card ID and updated card as arguments
  
    setIsEditing(false);
  };
  

  return (
    <>
      <div className='productList'>
        <div className='productCard'>
          <img src={card.image} alt='product-img' className='productImage'></img>
          <div className='productCard__content'>
            {isEditing ? (
              <input
                type='text'
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              <h3 className='productName'>{card.name}</h3>
            )}
            <div className='displayStack__1'>
              {isEditing ? (
                <input
                  type='text'
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                />
              ) : <></>}
            </div>
            {isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            ) : null}
            {isEditing ? (
              <Button btnStyle='success' onClick={handleSave}>
                Save
              </Button>
            ) : (
              <>
                <Button btnStyle='primary' onClick={moreDetails}>
                  More Details
                </Button>
                <Button btnStyle='danger' onClick={() => deleteHandler(card._id)}>
                  Delete
                </Button>
                <Button btnStyle='warning' onClick={handleEdit}>
                  Edit
                </Button>
              </>
            )}
            {isOpen && (
              <div>
                <div>
                  <DetailedView card={card}></DetailedView>
                </div>
                <Button btnStyle='warning' onClick={closeHandler}>
                  Hide Details
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
