import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import React, { Component } from 'react';

const google = window.google;

//components purpose is to highlight the locations where a movie was filmed on hover
class MovieTile extends Component {
  onMouseEnter(hoveredMovie) {
    debugger;

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
      console.log(google);
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
  onMouseLeave() {
    //remove movie locations markers from activeMovieLocations
    this.props.unhighlightMovieLocations();
  }

  render() {
    const movie = this.props.movie;
    return (
      <div
        className="movie-item"
        onMouseEnter={() => this.onMouseEnter(movie)}
        onMouseLeave={() => this.onMouseLeave()}
      >
        {movie.title}
      </div>
    );
  }
}

function mapStateToProps({ general }) {
  return {
    markerObjects: general.markerObjects,
    mapObject: general.mapObject
  };
}

export default connect(mapStateToProps, actions)(MovieTile);
