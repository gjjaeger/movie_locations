import _ from 'lodash';

import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  withScriptjs,
  GoogleMap as GMap,
  withGoogleMap,
  InfoWindow,
  Marker
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import SearchBar from './SearchBar';

import React, { Component } from 'react';

const google = window.google;
const apiKey = 'AIzaSyAUCiTUszeY7oXzJ7x_RLaF69FbjNWV4Dg';

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
  setCenter(address) {
    address = address ? address : { address: 'San Francisco, USA' };
    this.props.setCenter(address);
  }

  onBoundsChange(map) {
    this.props.setBounds(map.getBounds());
  }

  onMapLoad(map) {
    const google = window.google;
    if (!map) return;

    this._map = map;
    this._mapContext = this._map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

    this._mapContext.addListener('idle', () => {
      this.onBoundsChange(map);
    });
    let lastValidCenter = map.getCenter();

    if (map.props.children.props.children[0]) {
      let boundLimit = new google.maps.LatLngBounds();
      _.forEach(map.props.children.props.children, ({ props }) => {
        boundLimit.extend(props.position);
      });
      this.props.setBoundLimit(boundLimit);

      this._mapContext.addListener('center_changed', () => {
        if (boundLimit.contains(map.getCenter())) {
          lastValidCenter = map.getCenter();
          return;
        }
        this.props.setMapError(
          'The Bounds of this Map are limited to San Francisco only'
        );
        map.panTo(lastValidCenter);
      });
    }
  }

  markerClicked(location) {
    let movie = this.props.movies.list[location._movie];
    this.props.onMarkerClick(location, movie);
  }

  renderContent() {
    if (this.props.locations) {
      return _.map(this.props.locations, location => {
        return (
          <Marker
            key={location._id}
            position={{
              lat: parseFloat(location.lat),
              lng: parseFloat(location.lng)
            }}
            onClick={() => this.markerClicked(location)}
          />
        );
      });
    }
  }

  render() {
    const center = this.props.map.center
      ? this.props.map.center
      : { lat: 37.7749, lng: -122.4194 };
    return (
      <div>
        <SearchBar />
        <span className="danger">{this.props.map.error}</span>
        <AsyncMap
          id="map"
          loadingElement={<div>{'loading...'}</div>}
          defaultCenter={center}
          center={center}
          minZoom={7}
          maxZoom={15}
          onMapLoad={this.onMapLoad.bind(this)}
          containerElement={<div style={{ height: '250px', width: '100%' }} />}
          mapElement={<div style={{ height: '250px', width: '100%' }} />}
          defaultZoom={10}
          // onClick={_.noop}
        >
          <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
            {this.renderContent()}
          </MarkerClusterer>
        </AsyncMap>
      </div>
    );
  }
}

function mapStateToProps({ map, movies, locations }) {
  return { map, movies, locations };
}

export default connect(mapStateToProps, actions)(GoogleMap);
