import _ from 'lodash';

import { connect } from 'react-redux';
import * as actions from '../actions';

import React, { Component } from 'react';

const google = window.google;
class LocationList extends Component {
  renderContent() {
    const bounds = this.props.general.bounds;

    if (bounds) {
      const filtered = _.chain(this.props.locations)
        .filter(location => {
          return bounds.contains({
            lat: parseFloat(location.lat),
            lng: parseFloat(location.lng)
          });
        })
        .slice(0, 30)
        .map(location => {
          return location._movie;
        })
        .value();

      function getMovieObject(movies, item) {
        return movies[item];
      }

      return _.chain(filtered)
        .map(_.partial(getMovieObject, this.props.movies.list))
        .uniqBy('_id')
        .map(({ _id, title }) => {
          return <div key={_id}>{title}</div>;
        })
        .value();
    }
  }
  render() {
    return <div>{this.renderContent.bind(this)()}</div>;
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(LocationList);
