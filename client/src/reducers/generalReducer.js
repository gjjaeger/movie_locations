import {
  SET_BOUNDS,
  SET_BOUND_LIMIT,
  SET_SELECTED_MOVIE,
  SET_SELECTED_LOCATION,
  SET_MAP_ERROR,
  SET_MARKER_OBJECTS,
  SET_MAP_OBJECT
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
    case SET_MAP_ERROR:
      return { ...state, mapError: action.payload };
    case SET_MARKER_OBJECTS:
      return { ...state, markerObjects: action.payload };
    case SET_MAP_OBJECT:
      return { ...state, mapObject: action.payload };
    default:
      return state;
  }
}
