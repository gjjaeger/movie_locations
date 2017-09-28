import _ from 'lodash';

import { connect } from 'react-redux';
import * as actions from '../actions';
import React, { Component } from 'react';
import getLocationObjects from '../utils/getLocationObjects';
import locationsForRender from '../utils/locationsForRender';

class MovieInfo extends Component {
  renderContent() {
    if (this.props.selectedMovie && this.props.selectedLocation) {
      return (
        <div>
          <div>{this.props.selectedMovie.title}</div>
          {this.renderMovieLocations()}
        </div>
      );
    }

    return (
      <span className="italic">
        Click on a marker to find out more about a movie
      </span>
    );
  }

  onMouseEnter(location) {
    const markers = this.props.markerObjects;
    this.props.setMarker(markers[location._id]);

    const latLng = {
      lat: location.lat,
      lng: location.lng
    };
    this.props.setTemporaryCenter(latLng);
  }

  onMouseLeave() {
    this.props.removeTemporaryCenter();
    const markers = this.props.markerObjects;
    this.props.setMarker(markers[this.props.selectedLocation._id]);
  }

  renderMovieLocations() {
    const selectedMovie = this.props.selectedMovie;
    const selectedLocation = this.props.selectedLocation;
    const movieLocations = getLocationObjects(
      selectedMovie,
      this.props.locations
    );
    const outputArray = locationsForRender(
      selectedMovie,
      selectedLocation,
      this.props.locations,
      this.onMouseEnter.bind(this),
      this.onMouseLeave.bind(this)
    );
    return outputArray;
  }
  render() {
    return (
      <div className="selected-movie">
        <span className="subtitle">Selected Movie</span>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ general, locations }) {
  return {
    markerObjects: general.markerObjects,
    selectedMovie: general.selectedMovie,
    selectedLocation: general.selectedLocation,
    locations: locations
  };
}

export default connect(mapStateToProps, actions)(MovieInfo);
