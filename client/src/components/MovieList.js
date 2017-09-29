import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import React, { Component } from 'react';
import getLocationObjects from '../utils/getLocationObjects';

const google = window.google;

//components purpose is to highlight the locations where a movie was filmed on hover
class MovieList extends Component {
  renderContent() {
    const locations = this.props.locations;
    const movies = this.props.movieList;

    function onMouseEnter(hoveredMovie) {
      const markers = this.props.markerObjects;
      function getLocationMarker(markers, item) {
        return markers[item];
      }
      //get all the markers for this movie's locations
      const movieMarkers = _.map(
        hoveredMovie.locations,
        _.partial(getLocationMarker, markers)
      );

      if (movieMarkers.length > 1) {
        //find bounds for movie's markers if more than one
        let bounds = new google.maps.LatLngBounds();
        _.forEach(movieMarkers, ({ props }) => {
          bounds.extend(props.position);
        });

        this.props.mapObject.fitBounds(bounds);
      } else {
        //if only one Marker, set temporaryCenter = Marker's position
        this.props.setTemporaryCenter(movieMarkers[0].props.position);
      }
      //set movie locations markers as activeMovieLocations to highlight Markers
      this.props.highlightMovieLocations(movieMarkers);
    }
    function onMouseLeave() {
      //remove movie locations markers from activeMovieLocations
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

function mapStateToProps({ locations, movies, general }) {
  return {
    locations,
    movieList: movies.list,
    markerObjects: general.markerObjects,
    mapObject: general.mapObject
  };
}

export default connect(mapStateToProps, actions)(MovieList);
