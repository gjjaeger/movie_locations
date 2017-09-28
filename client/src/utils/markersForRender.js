import _ from 'lodash';
import React from 'react';
import { Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

export default (locations, activeMarker, markerClicked) => {
  const markerObjects = _.map(
    locations,
    _.partial(createMarker, activeMarker, markerClicked)
  );
  function createMarker(activeMarker, onMarkerClick, location) {
    let iconUrl;

    // const activePostion = activeMarker.props.position;
    const locationPosition = { lat: location.lat, lng: location.lng };

    if (
      activeMarker &&
      activeMarker.props.position.lat === locationPosition.lat &&
      activeMarker.props.position.lng === locationPosition.lng
    ) {
      iconUrl =
        'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';
    } else {
      iconUrl = 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png';
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
  return (
    <MarkerClusterer averageCenter enableRetinaIcons gridSize={60} maxZoom={14}>
      {markerObjects}
    </MarkerClusterer>
  );
};
