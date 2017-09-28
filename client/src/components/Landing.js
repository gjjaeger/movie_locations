import React from 'react';
import * as actions from '../actions';
import MapContainer from './MapContainer';
import LocationList from './LocationList';
import MovieInfo from './MovieInfo';

const Landing = () => {
  return (
    <div>
      <MapContainer />
      <LocationList />
      <MovieInfo />
    </div>
  );
};

export default Landing;
