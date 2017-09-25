import _ from 'lodash';

import { connect } from 'react-redux';
import * as actions from '../actions';

import React, { Component } from 'react';

const google = window.google;
class LocationList extends Component {
  renderContent() {
    const bounds = this.props.movieList.bounds;
    return _.map(this.props.movies, movie => {
      return _.map(movie.locations, location => {
        if (bounds) {
          if (
            bounds.contains({
              lat: parseFloat(location.lat),
              lng: parseFloat(location.lng)
            })
          ) {
            return <div>{movie.title}</div>;
          }
        }
      });
    });
  }
  render() {
    return <div>{this.renderContent.bind(this)()}</div>;
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(LocationList);
