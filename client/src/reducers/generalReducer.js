import {
  SET_BOUNDS,
  SET_ACTIVE_MARKER,
  SHOW_INFO_WINDOW,
  SET_SELECTED_MOVIE
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_BOUNDS:
      return { ...state, bounds: action.payload };
    case SET_ACTIVE_MARKER:
      return { ...state, activeMarker: action.payload };
    case SET_SELECTED_MOVIE:
      return { ...state, selectedMovie: action.payload };
    case SHOW_INFO_WINDOW:
      return { ...state, showInfoWindow: true };
    default:
      return state;
  }
}
