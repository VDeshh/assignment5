import React, { useState } from 'react';
import { Card } from './components/card';

export default function ShowAllDecks({ cards, deleteHandler, editHandler }) {
  const [card, setCard] = useState();

  return (
    <div className='Grid'>
      {cards.map((curr) => (
        <Card
          key={curr._id}
          id = {curr._id}
          card={curr}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      ))}

    </div>
  );
}
