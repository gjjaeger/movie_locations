import { SET_LOCATIONS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_LOCATIONS:
      return action.payload;
    default:
      return state;
  }
}
