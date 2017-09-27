import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import React, { Component } from 'react';

const google = window.google;

class LocationList extends Component {
  renderContent() {
    const locations = this.props.locations;
    const bounds = this.props.general.bounds;
    const movies = this.props.movies.list;

    if (bounds) {
      const filtered = _.chain(locations)
        .filter(({ lat, lng }) => {
          return bounds.contains({
            lat: parseFloat(lat),
            lng: parseFloat(lng)
          });
        })
        .slice(0, 30)
        .map(({ _movie }) => {
          return _movie;
        })
        .value();

      function getMovieObject(movies, item) {
        return movies[item];
      }

      return _.chain(filtered)
        .map(_.partial(getMovieObject, movies))
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
