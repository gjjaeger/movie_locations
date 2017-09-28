import {
  SET_LOCATION,
  SET_CENTER,
  SET_ACTIVE_MARKER,
  SET_TEMPORARY_CENTER,
  REMOVE_TEMPORARY_CENTER
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
    case REMOVE_TEMPORARY_CENTER:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
