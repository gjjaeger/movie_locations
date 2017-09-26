import { SET_MOVIES, SET_MOVIE_IDS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, list: action.payload };
    case SET_MOVIE_IDS:
      return { ...state, ids: action.payload };
    default:
      return state;
  }
}
