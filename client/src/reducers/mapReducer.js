import {
  SET_ACTIVE_MARKER,
  SHOW_INFO_WINDOW,
  SET_SELECTED_MOVIE,
  SET_LOCATION,
  SET_CENTER
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_ACTIVE_MARKER:
      return { ...state, activeMarker: action.payload };
    case SET_SELECTED_MOVIE:
      return { ...state, selectedMovie: action.payload };
    case SHOW_INFO_WINDOW:
      return { ...state, showInfoWindow: true };
    case SET_LOCATION:
      return { ...state, address: action.payload };
    case SET_CENTER:
      return { ...state, center: action.payload };

    default:
      return state;
  }
}
