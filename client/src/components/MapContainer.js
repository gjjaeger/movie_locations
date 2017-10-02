import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { GoogleMap as GMap, withGoogleMap, Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

import React, { Component } from 'react';
import calculateBoundLimit from '../utils/calculateBoundLimit';

//Load Async Map
const AsyncMap = _.flow(withGoogleMap)(props => (
  <GMap
    defaultCenter={props.defaultCenter}
    defaultZoom={props.defaultZoom}
    minZoom={props.minZoom}
    maxZoom={props.maxZoom}
    center={props.center}
    onClick={props.onClick}
    ref={props.onMapLoad}
  >
    {props.children}
  </GMap>
));

class GoogleMap extends Component {
  //used by LocationList component to render a list of movies
  //that were filmed within the current bounds
  onBoundsChange(map) {
    this.props.setBounds(map.getBounds());
  }

  onMapLoad(map) {
    if (!map) return;
    //initialize lastValidCenter for this component
    let lastValidCenter = map.getCenter();
    //for other components
    this._map = map;
    this._mapContext = this._map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    this.props.setMarkerObjects(map.props.children.props.children);
    this._mapContext.addListener('idle', () => {
      this.onBoundsChange(map);
    });
    this.props.setMapObject(map);

    //set a bound limit to the area of the markers
    if (map.props.children.props.children[0]) {
      const boundLimit = calculateBoundLimit(map.props.children.props.children);

      this.props.setBoundLimit(boundLimit);

      this._mapContext.addListener('center_changed', () => {
        if (boundLimit.contains(map.getCenter())) {
          lastValidCenter = map.getCenter();
          return;
        }
        //if current center is not within bounds, center map at lastValidCenter
        this.props.setMapError(
          'The Bounds of this Map are limited to San Francisco only'
        );
        map.panTo(lastValidCenter);
      });
    }
  }

  markerClicked(location) {
    let movie = this.props.movieList[location._movie];
    //set selectedMovie and selectedLocation
    this.props.onMarkerClick(location, movie);
    let markersArray = this._map.props.children.props.children;
    let markersObject = _.mapKeys(markersArray, 'key');
    //set selectedMarker
    this.props.setMarker(markersObject[location._id]);
  }

  renderMarkers() {
    if (this.props.locations) {
      //activeMarker and activeMovieLocations should be highlighted.
      //activeMarker is set when a Marker is clicked.
      //activeMovieLocations is set when user hovers over movie.
      return _.map(
        this.props.locations,
        _.partial(
          createMarker,
          this.props.activeMarker,
          this.props.activeMovieLocations,
          this.markerClicked.bind(this)
        )
      );

      //check if current Marker appears on activeMovieLocations Locations list
      function isMarkerSelected(activeMovieLocations, location) {
        return _.some(activeMovieLocations, marker => {
          return (
            marker.props.position.lat === location.lat &&
            marker.props.position.lng === location.lng
          );
        });
      }

      function createMarker(
        activeMarker,
        activeMovieLocations,
        onMarkerClick,
        location
      ) {
        let iconUrl;

        if (
          activeMarker &&
          activeMarker.props.position.lat === location.lat &&
          activeMarker.props.position.lng === location.lng
        ) {
          //adds special icon for activeMarker
          iconUrl =
            'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';
        } else if (
          activeMovieLocations &&
          isMarkerSelected(activeMovieLocations, location)
        ) {
          //adds special icon for activeMovieLocations
          iconUrl =
            'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        } else {
          //no special icon
          iconUrl =
            'https://maps.google.com/mapfiles/kml/shapes/library_maps.png';
        }

        return (
          <Marker
            key={location._id}
            position={{
              lat: location.lat,
              lng: location.lng
            }}
            onClick={() => onMarkerClick(location)}
            icon={{ url: iconUrl }}
          />
        );
      }
    }
  }

  render() {
    let center;

    if (this.props.temporaryCenter) {
      center = this.props.temporaryCenter;
    } else if (this.props.center) {
      center = this.props.center;
    } else {
      center = { lat: 37.7749, lng: -122.4194 };
    }

    return (
      <div>
        <AsyncMap
          id="map"
          googleMapURL="https://maps.googleapis.com/maps/api/js?&key=AIzaSyB4Q3nFfxKFAWLb3nzs_pT_WUa11R_Mauc&libraries=places"
          loadingElement={<div>{'loading...'}</div>}
          defaultCenter={center}
          center={center}
          minZoom={12}
          maxZoom={15}
          onMapLoad={this.onMapLoad.bind(this)}
          containerElement={<div className="map-container" />}
          mapElement={<div className="map" />}
          defaultZoom={12}
          // onClick={_.noop}
        >
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
            maxZoom={10}
          >
            {this.renderMarkers()}
          </MarkerClusterer>
        </AsyncMap>
      </div>
    );
  }
}

function mapStateToProps({ map, movies, locations }) {
  return {
    center: map.center,
    temporaryCenter: map.temporaryCenter,
    activeMarker: map.activeMarker,
    activeMovieLocations: map.activeMovieLocations,
    movieList: movies.list,
    locations
  };
}

export default connect(mapStateToProps, actions)(GoogleMap);
