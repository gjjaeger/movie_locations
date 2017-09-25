import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GoogleMap from './Map';
import PlacesAutocomplete from 'react-places-autocomplete';

const google = window.google;

class Landing extends Component {
  handleLocationFormSubmit({ address }) {
    this.props.setLocation({ address });
  }

  onLocationInputChange(address) {
    this.props.setLocation({ address });
    this.props.setCenter({ address });
  }
  render() {
    const AutocompleteItem = ({ suggestion }) => (
      <div>
        <i className="fa fa-map-marker" />
        {suggestion}
      </div>
    );
    const inputProps = {
      value: this.props.address,
      onChange: this.onLocationInputChange.bind(this),
      type: 'search',
      placeholder: 'Search Places...',
      autoFocus: true
    };
    const options = {
      location: new google.maps.LatLng(37.7749, 122.4194),
      radius: 2000,
      debounce: 1000
    };
    return (
      <div>
        <form onSubmit={this.handleLocationFormSubmit.bind(this)}>
          <PlacesAutocomplete
            inputProps={inputProps}
            option={options}
            autocompleteItem={AutocompleteItem}
          />
          <button action="submit" className="btn btn-primary">
            Continue
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { address: state.map.address };
}

export default connect(mapStateToProps, actions)(Landing);
