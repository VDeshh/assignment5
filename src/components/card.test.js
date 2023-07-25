import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { Card } from './Card';

test('Edit and Save buttons work as expected', () => {
  const card = {
    _id: '1',
    name: 'Test Card',
    description: 'This is a test card.',
    price: '100',
    image: 'test.jpg',
  };

  const { getByText, getByRole, queryByRole } = render(<Card card={card} deleteHandler={() => {}} editHandler={() => {}} />);

  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();

  fireEvent.click(editButton);

  const saveButton = getByText('Save');
  expect(saveButton).toBeInTheDocument();

  expect(getByRole('textbox', { name: '' })).toBeInTheDocument(); // For name and price
  expect(queryByRole('textbox', { name: 'textarea' })).toBeInTheDocument(); // For description

  fireEvent.click(saveButton);

  expect(saveButton).not.toBeInTheDocument();
  expect(editButton).toBeInTheDocument();

  expect(queryByRole('textbox', { name: '' })).not.toBeInTheDocument(); // For name and price
  expect(queryByRole('textbox', { name: 'textarea' })).not.toBeInTheDocument(); // For description
});
