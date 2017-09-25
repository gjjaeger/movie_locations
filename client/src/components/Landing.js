import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MapContainer from './maptest';
import LocationList from './LocationList';
import Marker from './MarkerContainer';

class Landing extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  renderContent() {
    if (this.props.movies.length > 1) {
      return this.props.movies.map(movie => {
        return <div key={movie._id}>{movie.title}</div>;
      });
    }
    return <div>Loading...</div>;
  }
  renderChildren() {
    if (this.props.movies) {
      return _.map(this.props.movies, movie => {
        return _.map(movie.locations, location => {
          return (
            <Marker
              key={location._id}
              position={{
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lng)
              }}
            />
          );
        });
      });
    }
  }
  render() {
    return (
      <div>
        {this.renderContent()}
        <MapContainer>{this.renderChildren()}</MapContainer>
        <LocationList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(Landing);
