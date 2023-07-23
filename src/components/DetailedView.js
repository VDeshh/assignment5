import React from 'react';

export function DetailedView({ card }) {
  return (
    <>
        <br></br>
        <div className="dialog">
        <div className='productPrice'>Product Price: ${card.price}</div>
          <h3 className='productDescription'>{card.description}</h3>
        </div>
    </>
  );
};
