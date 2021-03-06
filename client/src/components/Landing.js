import React from 'react';
import MapContainer from './MapContainer';
import LocationList from './LocationList';
import MovieInfo from './MovieInfo';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import ErrorBar from './ErrorBar';

const Landing = () => {
  return (
    <div className="landing-container">
      <SearchBar />
      <MapContainer />

      <ErrorBar />
      <MovieList />
      <LocationList />
      <MovieInfo />
    </div>
  );
};

export default Landing;
