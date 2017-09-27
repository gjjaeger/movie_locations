import axios from 'axios';
import {
  SET_MOVIES,
  SET_ACTIVE_MARKER,
  SHOW_INFO_WINDOW,
  SET_SELECTED_MOVIE,
  SET_LOCATION,
  SET_CENTER,
  SET_BOUNDS,
  SET_BOUND_LIMIT,
  SET_LOCATIONS,
  SET_MOVIE_IDS,
  SET_SELECTED_LOCATION,
  SET_MAP_ERROR
} from './types';
import { normalize, schema, Schema, arrayOf } from 'normalizr';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

('use strict');

export const fetchMovies = () => async dispatch => {
  const result = await axios.get('/api/movies');
  console.log(result.data);
  const location = await new schema.Entity(
    'locations',
    {},
    {
      idAttribute: '_id'
    }
  );
  const movie = await new schema.Entity(
    'movies',
    { locations: [location] },
    {
      idAttribute: '_id'
    }
  );

  const movieListSchema = [movie];

  const normalizedData = normalize(result.data, movieListSchema);

  dispatch({ type: SET_MOVIES, payload: normalizedData.entities.movies });
  dispatch({ type: SET_MOVIE_IDS, payload: normalizedData.result });
  dispatch({ type: SET_LOCATIONS, payload: normalizedData.entities.locations });
};

export const onMarkerClick = (
  selectedLocation,
  selectedMovie
) => async dispatch => {
  dispatch({ type: SHOW_INFO_WINDOW });
  dispatch({ type: SET_SELECTED_MOVIE, payload: selectedMovie });
  dispatch({ type: SET_SELECTED_LOCATION, payload: selectedLocation });
};

export const setLocation = ({ address }) => async dispatch => {
  dispatch({
    type: SET_LOCATION,
    payload: address
  });
};

export const setCenter = ({ address }) => async dispatch => {
  geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      dispatch({
        type: SET_CENTER,
        payload: latLng
      });
    })
    .catch(error => console.error('Error', error));
};

export const setBounds = bounds => async dispatch => {
  dispatch({
    type: SET_BOUNDS,
    payload: bounds
  });
};

export const setBoundLimit = boundLimit => async dispatch => {
  dispatch({
    type: SET_BOUND_LIMIT,
    payload: boundLimit
  });
};

export const setMapError = message => async dispatch => {
  dispatch({
    type: SET_MAP_ERROR,
    payload: message
  });
};
