import React from 'react';
import * as actions from '../actions';
import MapContainer from './MapContainer';
import LocationList from './LocationList';
import MovieInfo from './MovieInfo';

const Landing = () => {
  return (
    <div>
      <h1>San Francisco Movie Search</h1>
      <MapContainer />
      <LocationList />
      <MovieInfo />
    </div>
  );
};

export default Landing;
