import { SET_LOCATION, SET_CENTER } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, address: action.payload };
    case SET_CENTER:
      return { ...state, center: action.payload };
    default:
      return state;
  }
}
