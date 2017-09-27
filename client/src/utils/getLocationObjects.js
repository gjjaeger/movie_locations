import _ from 'lodash';

export default (selectedMovie, locationsArray) => {
  function getLocationObject(locations, item) {
    return locations[item];
  }
  return _.map(
    selectedMovie.locations,
    _.partial(getLocationObject, locationsArray)
  );
};
