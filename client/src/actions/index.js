import axios from 'axios';
import {
  FETCH_MOVIES,
  SET_ACTIVE_MARKER,
  SHOW_INFO_WINDOW,
  SET_SELECTED_MOVIE,
  SET_LOCATION,
  SET_CENTER,
  SET_BOUNDS
} from './types';
import { normalize, schema, Schema, arrayOf } from 'normalizr';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

export const fetchMovies = () => async dispatch => {
  const result = await axios.get('/api/movies');
  // console.log(JSON.stringify(result.data));
  // const location = await new schema.Entity(
  //   'locations',
  //   {},
  //   {
  //     idAttribute: '_id'
  //   }
  // );
  // const movie = await new schema.Entity(
  //   'movies',
  //   { locations: [location] },
  //   {
  //     idAttribute: '_id'
  //   }
  // );
  //
  // const normalizedData1 = JSON.stringify(normalize(result.data, movie));
  //
  // debugger;
  // result.data.entities.movies['59c7698d544d56b262e2187e'];

  dispatch({ type: FETCH_MOVIES, payload: result.data });
};

export const onMarkerClicks = (
  active_marker,
  movie_title
) => async dispatch => {
  dispatch({ type: SHOW_INFO_WINDOW });
  dispatch({ type: SET_ACTIVE_MARKER, payload: { active_marker } });
  dispatch({ type: SET_SELECTED_MOVIE, payload: movie_title });
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
