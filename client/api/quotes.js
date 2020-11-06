import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const postQuote = info =>
  request.post('/api/quotes')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const getQuotes = () =>
  request.get('/api/quotes')
    .then(handleSuccess)
    .catch(handleError);

export const deleteQuote = info =>
  request.delete('/api/quotes')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);
