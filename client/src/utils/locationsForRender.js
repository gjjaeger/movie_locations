import _ from 'lodash';
import React from 'react';

export default (selectedMovie, selectedLocation, locations) => {
  const otherLocations = _.chain(selectedMovie.locations)
    .filter(location => {
      return location != selectedLocation._id;
    })
    .map(location_id => {
      return locations[location_id];
    })
    .value();

  let outputArray = [];
  outputArray.push(
    <div key={selectedLocation._id}>
      <strong>{selectedLocation.address}</strong>
    </div>
  );
  if (otherLocations.length > 0) {
    outputArray.push(<div key={'title'}>Other Locations: </div>);
    _.forEach(otherLocations, location => {
      outputArray.push(<div key={location._id}>{location.address}</div>);
    });
  }
  return outputArray;
};
