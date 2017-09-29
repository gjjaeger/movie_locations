import React from 'react';
import MapContainer from './MapContainer';
import LocationList from './LocationList';
import MovieInfo from './MovieInfo';
import MovieList from './MovieList';

const Landing = () => {
  return (
    <div>
      <MapContainer />
      <MovieList />
      <LocationList />
      <MovieInfo />
    </div>
  );
};

export default Landing;
