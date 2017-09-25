import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import moviesReducer from './moviesReducer';
import mapReducer from './mapReducer';
import movieListReducer from './movieListReducer';

export default combineReducers({
  movies: moviesReducer,
  map: mapReducer,
  movieList: movieListReducer
});
