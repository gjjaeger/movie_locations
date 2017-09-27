import { SET_LOCATION, SET_CENTER, SET_MAP_ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, address: action.payload };
    case SET_CENTER:
      return { ...state, center: action.payload };
    case SET_MAP_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
