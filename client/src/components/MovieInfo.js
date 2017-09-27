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

    return 'No selected Movie';
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
      this.props.locations
    );
    return outputArray;
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ general, locations }) {
  return {
    selectedMovie: general.selectedMovie,
    selectedLocation: general.selectedLocation,
    locations: locations
  };
}

export default connect(mapStateToProps, actions)(MovieInfo);
