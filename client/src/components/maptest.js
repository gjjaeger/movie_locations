import _ from 'lodash';

import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  withScriptjs,
  GoogleMap as GMap,
  withGoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import SearchBar from './SearchBar';
// import Marker from './MarkerContainer';

import React, { Component } from 'react';

const google = window.google;
const apiKey = 'AIzaSyAUCiTUszeY7oXzJ7x_RLaF69FbjNWV4Dg';

const AsyncMap = _.flow(withGoogleMap)(
  props => (
    console.log(props),
    (
      <GMap
        defaultCenter={props.defaultCenter}
        defaultZoom={props.defaultZoom}
        mapHolderRef={props.mapHolderRef}
        center={props.center}
        onClick={props.onClick}
        ref={props.onMapLoad}
      >
        {props.children}
      </GMap>
    )
  )
);

class GoogleMap extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     dragged: false
  //   };
  //
  //   this.dragged = this.dragged.bind(this);
  //   this.onMapLoad = this.onMapLoad.bind(this);
  //   this.resize = this.resize.bind(this);
  // }

  dragged() {
    // this.setState({ dragged: true });
  }

  setCenter(address) {
    address = address ? address : { address: 'San Francisco, USA' };
    this.props.setCenter(address);
  }

  clicked(map) {
    this.props.setBounds(map.getBounds());
  }

  onMapLoad(map) {
    const google = window.google;
    if (!map) return;

    this._map = map;
    this._mapContext = this._map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

    this._mapContext.addListener('idle', () => {
      this.clicked(map);
    });

    // this._mapContext.addListener('drag', this.dragged);
  }

  resize() {
    window.google.maps.event.trigger(this._mapContext, 'resize');

    // if (!this.state.dragged)
    //   this._mapContext.setCenter(this.props.defaultCenter);
  }

  markerClicked(marker) {
    this.props.showInfoWindow();
  }

  renderContent() {
    if (this.props.movies) {
      return _.map(this.props.movies, movie => {
        return _.map(movie.locations, location => {
          return (
            <Marker
              key={location._id}
              position={{
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lng)
              }}
              onClick={this.markerClicked.bind(this)}
              map={this._map}
            />
          );
        });
      });
    }
  }
  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: { lat: 12.129, lng: 19.231 }
      });
    });
  }

  // onPlacesChanged = () => {
  //   const places = refs.searchBox.getPlaces();
  //   const bounds = new google.maps.LatLngBounds();
  //
  //   places.forEach(place => {
  //     if (place.geometry.viewport) {
  //       bounds.union(place.geometry.viewport);
  //     } else {
  //       bounds.extend(place.geometry.location);
  //     }
  //   });
  //   const nextMarkers = places.map(place => ({
  //     position: place.geometry.location
  //   }));
  //   const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
  //
  //   this.setState({
  //     center: nextCenter,
  //     markers: nextMarkers
  //   });
  //   // refs.map.fitBounds(bounds);
  // };

  render() {
    const center = this.props.map.center
      ? this.props.map.center
      : { lat: 12.129, lng: 19.231 };
    return (
      <div>
        <SearchBar />
        <AsyncMap
          id="map"
          loadingElement={<div>{'loading...'}</div>}
          defaultCenter={center}
          center={center}
          onMapLoad={this.onMapLoad.bind(this)}
          containerElement={<div style={{ height: '250px', width: '100%' }} />}
          mapElement={<div style={{ height: '250px', width: '100%' }} />}
          defaultZoom={10}
          // onClick={_.noop}
        >
          {this.renderContent.bind(this)()}
          {this.renderChildren()}
        </AsyncMap>
      </div>
    );
  }
}

function mapStateToProps({ map, movies }) {
  return { map: map, movies: movies };
}

export default connect(mapStateToProps, actions)(GoogleMap);
