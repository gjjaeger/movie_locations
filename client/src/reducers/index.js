import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import moviesReducer from './moviesReducer';

export default combineReducers({
  movies: moviesReducer
});
