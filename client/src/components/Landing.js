import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MapContainer from './MapContainer';
import LocationList from './LocationList';
import MovieInfo from './MovieInfo';

class Landing extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  renderContent() {
    // if (this.props.movies.list.length > 1) {
    //   return this.props.movies.list.map(movie => {
    //     return <div key={movie._id}>{movie.title}</div>;
    //   });
    // }
    // return <div>Loading...</div>;
  }
  render() {
    return (
      <div>
        {this.renderContent()}
        <MapContainer />
        <LocationList />
        <MovieInfo />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(Landing);
