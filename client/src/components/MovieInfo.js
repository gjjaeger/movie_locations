import _ from 'lodash';

import { connect } from 'react-redux';
import * as actions from '../actions';

import React, { Component } from 'react';

class MovieInfo extends Component {
  renderContent() {
    if (this.props.selectedMovie) {
      return (
        <div>
          <div>{this.props.selectedMovie.title}</div>
          {this.renderMovieLocations(this.props.selectedMovie)}
        </div>
      );
    }

    return 'No selected Movie';
  }
  renderMovieLocations(selectedMovie) {
    return _.map(selectedMovie.locations, location => {
      return <div key={location._id}>{location.address}</div>;
    });
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ general }) {
  return { selectedMovie: general.selectedMovie };
}

export default connect(mapStateToProps, actions)(MovieInfo);
