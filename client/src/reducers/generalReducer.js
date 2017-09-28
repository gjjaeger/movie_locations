import {
  SET_BOUNDS,
  SET_BOUND_LIMIT,
  SHOW_INFO_WINDOW,
  SET_SELECTED_MOVIE,
  SET_SELECTED_LOCATION,
  SET_MAP_ERROR,
  SET_MARKER_OBJECTS
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_BOUNDS:
      return { ...state, bounds: action.payload };
    case SET_BOUND_LIMIT:
      return { ...state, boundLimit: action.payload };
    case SET_SELECTED_MOVIE:
      return { ...state, selectedMovie: action.payload };
    case SET_SELECTED_LOCATION:
      return { ...state, selectedLocation: action.payload };
    case SHOW_INFO_WINDOW:
      return { ...state, showInfoWindow: true };
    case SET_MAP_ERROR:
      return { ...state, mapError: action.payload };
    case SET_MARKER_OBJECTS:
      return { ...state, markerObjects: action.payload };
    default:
      return state;
  }
}
