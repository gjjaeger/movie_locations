import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import mapReducer from './mapReducer';
import generalReducer from './generalReducer';
import locationsReducer from './locationsReducer';
import authReducer from './authReducer';

export default combineReducers({
  movies: moviesReducer,
  map: mapReducer,
  general: generalReducer,
  locations: locationsReducer,
  auth: authReducer
});
