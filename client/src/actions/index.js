import _ from 'lodash';

import axios from 'axios';
import {
  SET_MOVIES,
  SET_ACTIVE_MARKER,
  SET_SELECTED_MOVIE,
  SET_LOCATION,
  SET_CENTER,
  SET_BOUNDS,
  SET_BOUND_LIMIT,
  SET_LOCATIONS,
  SET_MOVIE_IDS,
  SET_SELECTED_LOCATION,
  SET_MAP_ERROR,
  SET_MARKER_OBJECTS,
  SET_TEMPORARY_CENTER,
  CLEAR_TEMPORARY_CENTER,
  SET_ACTIVE_MOVIE_MARKERS,
  CLEAR_ACTIVE_MOVIE_MARKERS,
  SET_TEMPORARY_BOUNDS,
  CLEAR_TEMPORARY_BOUNDS,
  SET_MAP_OBJECT,
  FETCH_USER
} from './types';
import { normalize, schema } from 'normalizr';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchMovies = () => async dispatch => {
  const result = await axios.get('/api/movies');
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
  if (normalizedData.result.length > 0) {
    dispatch({ type: SET_MOVIES, payload: normalizedData.entities.movies });
    dispatch({ type: SET_MOVIE_IDS, payload: normalizedData.result });
    dispatch({
      type: SET_LOCATIONS,
      payload: normalizedData.entities.locations
    });
  }
};

export const onMarkerClick = (
  selectedLocation,
  selectedMovie
) => async dispatch => {
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

export const setTemporaryCenter = latLng => async dispatch => {
  dispatch({
    type: SET_TEMPORARY_CENTER,
    payload: latLng
  });
};

export const removeTemporaryCenter = () => {
  return { type: CLEAR_TEMPORARY_CENTER, payload: 'temporaryCenter' };
};

export const setBounds = bounds => async dispatch => {
  dispatch({
    type: SET_BOUNDS,
    payload: bounds
  });
};

export const setMarkerObjects = markersArray => async dispatch => {
  const markersObject = _.mapKeys(markersArray, 'key');
  dispatch({
    type: SET_MARKER_OBJECTS,
    payload: markersObject
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

export const setMarker = marker => {
  return {
    type: SET_ACTIVE_MARKER,
    payload: marker
  };
};

export const highlightMovieLocations = markers => {
  return {
    type: SET_ACTIVE_MOVIE_MARKERS,
    payload: markers
  };
};

export const unhighlightMovieLocations = () => {
  return {
    type: CLEAR_ACTIVE_MOVIE_MARKERS,
    payload: 'activeMovieLocations'
  };
};

export const setTemporaryBounds = bounds => async dispatch => {
  dispatch({
    type: SET_TEMPORARY_BOUNDS,
    payload: bounds
  });
};

export const removeTemporaryBounds = () => {
  return { type: CLEAR_TEMPORARY_BOUNDS, payload: 'temporaryBounds' };
};

export const setMapObject = map => {
  return {
    type: SET_MAP_OBJECT,
    payload: map
  };
};
