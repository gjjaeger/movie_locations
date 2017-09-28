import {
  SET_LOCATION,
  SET_CENTER,
  SET_ACTIVE_MARKER,
  SET_TEMPORARY_CENTER,
  CLEAR_TEMPORARY_CENTER,
  SET_ACTIVE_MOVIE_MARKERS,
  CLEAR_ACTIVE_MOVIE_MARKERS,
  SET_TEMPORARY_BOUNDS,
  CLEAR_TEMPORARY_BOUNDS
} from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, address: action.payload };
    case SET_CENTER:
      return { ...state, center: action.payload };
    case SET_ACTIVE_MARKER:
      return { ...state, activeMarker: action.payload };
    case SET_TEMPORARY_CENTER:
      return { ...state, temporaryCenter: action.payload };
    case CLEAR_TEMPORARY_CENTER:
      return _.omit(state, action.payload);
    case SET_ACTIVE_MOVIE_MARKERS:
      return { ...state, activeMovieLocations: action.payload };
    case CLEAR_ACTIVE_MOVIE_MARKERS:
      return _.omit(state, action.payload);
    case SET_TEMPORARY_BOUNDS:
      return { ...state, temporaryBounds: action.payload };
    case CLEAR_TEMPORARY_BOUNDS:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
