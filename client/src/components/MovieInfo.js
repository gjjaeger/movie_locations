import _ from 'lodash';

import { connect } from 'react-redux';
import * as actions from '../actions';

import React, { Component } from 'react';

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
    function getLocationObject(locations, item) {
      return locations[item];
    }
    const movieLocations = _.map(
      this.props.selectedMovie.locations,
      _.partial(getLocationObject, this.props.locations)
    );
    const selectedLocation = this.props.selectedLocation;
    const otherLocations = _.filter(
      this.props.selectedMovie.locations,
      location => {
        return !selectedLocation._id;
      }
    );
    return <div key={selectedLocation._id}>{selectedLocation.address}</div>;
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
