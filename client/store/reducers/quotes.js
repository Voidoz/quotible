import update from 'immutability-helper';
import R from 'ramda';

import {
  SET_QUOTES, ADD_QUOTE, TOGGLE_COMPLETE_QUOTE, UPDATE_QUOTE, REMOVE_QUOTE,
} from '_actions/quotes';

import { LOGOUT_USER } from '_actions/user';

export function quote(state = {
  completed: false,
}, action) {
  switch (action.type) {
    case ADD_QUOTE:
      return update(state, {
        id: { $set: action.id },
        text: { $set: action.text },
        createdAt: { $set: action.createdAt },
      });
    case TOGGLE_COMPLETE_QUOTE:
      return update(state, {
        completed: { $apply: x => !x },
      });
    case UPDATE_QUOTE:
      return update(state, {
        text: { $set: action.text },
        updatedAt: { $set: action.updatedAt },
      });
    default:
      return state;
  }
}

export default function quotes(state = [], action) {
  const index = R.findIndex(R.propEq('id', action.id), state);
  const updatedAtIndex = { $splice: [[index, 1, quote(state[index], action)]] };

  switch (action.type) {
    case SET_QUOTES:
      return update(state, { $set: action.quotes });
    case ADD_QUOTE:
      return update(state, { $push: [quote(undefined, action)] });
    case TOGGLE_COMPLETE_QUOTE:
      return update(state, updatedAtIndex);
    case UPDATE_QUOTE:
      return update(state, updatedAtIndex);
    case REMOVE_QUOTE:
      return update(state, { $splice: [[index, 1]] });
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
