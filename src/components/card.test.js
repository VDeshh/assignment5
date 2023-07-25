import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { Card } from './Card';

test('Edit and Save buttons work as expected', () => {
  const card = {
    _id: '1',
    name: 'Test Card',
    description: '',
    price: '100',
    image: 'test.jpg',
  };

  const { getByText, getAllByRole, queryByRole } = render(<Card card={card} deleteHandler={() => {}} editHandler={() => {}} />);

  // Expect the Edit button to be in the document initially
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();

  // Click the Edit button
  fireEvent.click(editButton);

  // Expect the Save button to now be in the document
  const saveButton = getByText('Save');
  expect(saveButton).toBeInTheDocument();

  expect(getAllByRole('textbox', { name: '' })).toHaveLength(3); // For name and price
  expect(queryByRole('textbox', { name: 'textarea' })).toBeNull();


fireEvent.click(saveButton);

const editButtonAfterSave = getByText('Edit');

expect(saveButton).not.toBeInTheDocument();
expect(editButtonAfterSave).toBeInTheDocument();


  expect(queryByRole('textbox', { name: '' })).not.toBeInTheDocument(); // For name and price
  expect(queryByRole('textbox', { name: 'textarea' })).not.toBeInTheDocument(); // For description
});
