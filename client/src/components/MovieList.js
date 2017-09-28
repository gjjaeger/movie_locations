import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import React, { Component } from 'react';
import getLocationObjects from '../utils/getLocationObjects';

const google = window.google;

class MovieList extends Component {
  renderContent() {
    const locations = this.props.locations;
    const movies = this.props.movies.list;

    function onMouseEnter(hoveredMovie) {
      const markers = this.props.general.markerObjects;
      function getLocationMarker(markers, item) {
        return markers[item];
      }
      const movieMarkers = _.map(
        hoveredMovie.locations,
        _.partial(getLocationMarker, markers)
      );

      //find bounds for movie's markers if more than one
      if (movieMarkers.length > 1) {
        let bounds = new google.maps.LatLngBounds();
        _.forEach(movieMarkers, ({ props }) => {
          bounds.extend(props.position);
        });

        this.props.general.mapObject.fitBounds(bounds);
      } else {
        this.props.setTemporaryCenter(movieMarkers[0].props.position);
      }
      this.props.highlightMovieLocations(movieMarkers);
    }
    function onMouseLeave() {
      // this.props.removeTemporaryCenter();
      this.props.unhighlightMovieLocations();
    }

    return _.map(movies, movie => {
      return (
        <div
          className="movie-item"
          onMouseEnter={() => onMouseEnter.bind(this)(movie)}
          onMouseLeave={() => onMouseLeave.bind(this)()}
          key={movie._id}
        >
          {movie.title}
        </div>
      );
    });
  }
  render() {
    return (
      <div className="movie-list">
        <span />
        {this.renderContent.bind(this)()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(MovieList);
