import axios from 'axios';
import { FETCH_MOVIES } from './types';
import { normalize, schema } from 'normalizr';

export const fetchMovies = () => async dispatch => {
  const res = await axios.get('/api/movies');

  dispatch({ type: FETCH_MOVIES, payload: res.data });
};
