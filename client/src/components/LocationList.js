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
            lat: lat,
            lng: lng
          });
        })
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
        .map(movie => {
          return (
            <div
              className="shown-location small-title col-xs-6"
              onMouseEnter={() => onMouseEnter(movie)}
              onMouseLeave={() => onMouseMovie()}
              key={movie._id}
            >
              {movie.title}
            </div>
          );
        })
        .value();
    }
  }
  render() {
    return (
      <div className="location-list">{this.renderContent.bind(this)()}</div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(LocationList);
