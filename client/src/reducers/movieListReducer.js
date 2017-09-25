import { SET_BOUNDS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_BOUNDS:
      return { ...state, bounds: action.payload };
    default:
      return state;
  }
}
