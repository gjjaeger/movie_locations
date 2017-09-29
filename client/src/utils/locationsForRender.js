import _ from 'lodash';
import React from 'react';

export default (
  selectedMovie,
  selectedLocation,
  locations,
  onMouseEnter,
  onMouseLeave
) => {
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
      <span>Filmed in:</span>
      <div
        id="selected-location"
        onMouseEnter={() => onMouseEnter(selectedLocation)}
        onMouseLeave={() => onMouseLeave()}
      >
        {selectedLocation.address}
      </div>
    </div>
  );
  if (otherLocations.length > 0) {
    _.forEach(otherLocations, location => {
      outputArray.push(
        <div
          key={location._id}
          className="other-location"
          onMouseEnter={() => onMouseEnter(location)}
          onMouseLeave={() => onMouseLeave()}
        >
          {location.address}
        </div>
      );
    });
  }
  return outputArray;
};
