import _ from 'lodash';
const google = window.google;

export default markers => {
  let boundLimit = new google.maps.LatLngBounds();
  _.forEach(markers, ({ props }) => {
    boundLimit.extend(props.position);
  });
  return boundLimit;
};
