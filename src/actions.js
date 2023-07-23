// Action Types
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';

// Action Creators
export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

export const editItem = (id, updatedItem) => ({
  type: EDIT_ITEM,
  payload: { id, updatedItem },
});
