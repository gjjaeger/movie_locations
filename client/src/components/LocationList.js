import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import React, { Component } from 'react';

const google = window.google;

class LocationList extends Component {
  renderContent() {
    const locations = this.props.locations;
    const bounds = this.props.mapBounds;
    const movies = this.props.movieList;

    if (bounds) {
      // filter out all locations/markers within bounds
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
      //get locations' movie objects and return content for render
      return _.chain(filtered)
        .uniqBy()
        .map(_.partial(getMovieObject, movies))
        .map(movie => {
          return (
            <div
              className="shown-location small-title col-xs-6"
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
      <div className="location-list">
        <span className="center col-xs-12 subtitle">
          Movies filmed in this area
        </span>
        {this.renderContent.bind(this)()}
      </div>
    );
  }
}

function mapStateToProps({ general, movies, locations }) {
  return {
    mapBounds: general.bounds,
    movieList: movies.list,
    locations
  };
}

export default connect(mapStateToProps, actions)(LocationList);
