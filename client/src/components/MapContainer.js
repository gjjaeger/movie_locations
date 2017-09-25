import React, { Component } from 'react';
import _ from 'lodash';
import * as actions from '../actions';
import { connect } from 'react-redux';
import MarkerContainer from './MarkerContainer';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
const { withScriptjs, withGoogleMap, GoogleMap } = require('../index');

export class MapContainer extends Component {
  renderContent() {
    if (this.props.movies.length > 1) {
      return _.map(this.props.movies, movie => {
        return _.map(movie.locations, ({ lat, lng }) => {
          const nen = this;
          debugger;
          return (
            <MarkerContainer
              title={'The marker`s title will appear as a tooltip.'}
              movie={movie}
              position={{ lat: lat, lng: lng }}
              map={this.props.map}
              google={this.props.google}
            />
          );
        });
      });
    }
    return;
  }
  render() {
    let tester = this.renderContent.bind(this);
    return (
      <Map google={this.props.google} clickableIcons={true} zoom={1}>
        {tester()}
        <InfoWindow
          marker={this.props.map.activeMarker}
          visible={this.props.map.showInfoWindow}
          position={this.props.map.activeMarker}
        >
          <div>
            <h1>{this.props.map.selectedMovie}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

const MapComponent = GoogleApiWrapper({
  apiKey: 'AIzaSyAUCiTUszeY7oXzJ7x_RLaF69FbjNWV4Dg'
})(MapContainer);

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(MapComponent);
