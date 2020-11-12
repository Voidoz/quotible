export const SET_QUOTES = 'SET_QUOTES';
export const ADD_QUOTE = 'ADD_QUOTE';
export const TOGGLE_COMPLETE_QUOTE = 'TOGGLE_COMPLETE_QUOTE';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const REMOVE_QUOTE = 'REMOVE_QUOTE';
export const INCREMENT_QUOTE_ID = 'INCREMENT_QUOTE_ID';

export const setQuotes = quotes => ({
  type: SET_QUOTES,
  quotes,
});

export const addQuote = ({ franchise, installment, character, quote }) => ({
  type: ADD_QUOTE,
  franchise,
  installment,
  character,
  quote,
});

export const toggleCompleteQuote = id => ({
  type: TOGGLE_COMPLETE_QUOTE,
  id,
});

export const updateQuote = ({ id, text, updatedAt }) => ({
  type: UPDATE_QUOTE,
  updatedAt,
  id,
  text,
});

export const removeQuote = id => ({
  type: REMOVE_QUOTE,
  id,
});
