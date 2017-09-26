import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import moviesReducer from './moviesReducer';
import mapReducer from './mapReducer';
import generalReducer from './generalReducer';
import locationsReducer from './locationsReducer';

export default combineReducers({
  movies: moviesReducer,
  map: mapReducer,
  general: generalReducer,
  locations: locationsReducer
});
