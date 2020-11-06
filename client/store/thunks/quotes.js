import { push } from 'connected-react-router';
import { snakeToCamelCase } from 'json-style-converter/es5';
import R from 'ramda';

import { getQuotes, postQuote, deleteQuote } from '_api/quotes';
import { setQuotes, addQuote, removeQuote } from '_actions/quotes';

import { dispatchError } from '_utils/api';

export const attemptGetQuotes = () => dispatch =>
  getQuotes()
    .then(data => {
      const quotes = R.map(quote =>
        R.omit(['Id'], R.assoc('id', quote._id, snakeToCamelCase(quote))), data.quotes);

      dispatch(setQuotes(quotes));
      return data.quotes;
    })
    .catch(dispatchError(dispatch));

export const attemptAddQuote = newQuote => dispatch =>
  postQuote(newQuote)
    .then(data => {
      const quote = R.omit(['Id'], R.assoc('id', data.quote._id, snakeToCamelCase(data.quote)));

      dispatch(addQuote(quote));
      return data.user;
    })
    .then(() => dispatch(push('/home')))
    .catch(dispatchError(dispatch));

export const attemptDeleteQuote = id => dispatch =>
  deleteQuote({ id })
    .then(data => {
      dispatch(removeQuote(id));
      return data;
    })
    .catch(dispatchError(dispatch));
