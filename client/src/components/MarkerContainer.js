import React, { Component } from 'react';
import _ from 'lodash';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Map, Marker } from 'google-maps-react';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

export class MarkerContainer extends Component {
  onMarkerClick() {
    debugger;
    this.props.onMarkerClicks(this, this.name);
  }

  renderMarker() {
    const google = window.google;
    let { map, position } = this.props;
    debugger;

    let pos = position;
    // position = new google.maps.LatLng(pos.lat, pos.lng);

    const pref = {
      setMap: map,
      position: position
    };
    this.marker = new google.maps.Marker(pref);
  }

  markerClicked(marker) {
    this.props.showInfoWindow();
  }

  render() {
    const { marker } = this.props;
    debugger;
    return (
      <Marker
        mapHolderRef={this.props.mapHolderRef}
        onClick={this.markerClicked.bind(this)}
      />
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(MarkerContainer);
