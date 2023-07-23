import { combineReducers } from 'redux';
import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from './actions';

const initialState = {
  cards: [],
};

const cardsReducer = (state = initialState.cards, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    case DELETE_ITEM:
      return state.filter((card) => card._id !== action.payload);
    case EDIT_ITEM:
      return state.map((card) => {
        if (card._id === action.payload.id) {
          return action.payload.updatedItem;
        }
        return card;
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cards: cardsReducer,
});

export default rootReducer;
