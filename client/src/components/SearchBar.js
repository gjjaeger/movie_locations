import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PlacesAutocomplete from 'react-places-autocomplete';

const google = window.google;

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { currentAddress: '' };
  }

  setCenter(address) {
    address = address ? address : { address: 'San Francisco, USA' };
    this.props.setCenter(address);
  }

  handleLocationFormSubmit(e) {
    e.preventDefault();
    const { address } = this.props;
    this.props.setLocation({ address });
    this.props.setCenter({ address });
  }

  handleOnSelect(address, placeId) {
    this.props.setLocation({ address });
    this.props.setCenter({ address });
  }

  onLocationInputChange(address) {
    // this.setState({ currentAddress: address });
    // this.setState((currentAddress: address));
    this.props.setLocation({ address });
  }
  render() {
    const AutocompleteItem = ({ suggestion }) => (
      <div>
        <i className="fa fa-map-marker" />
        {suggestion}
      </div>
    );
    const inputProps = {
      value: this.props.address ? this.props.address : 'San Francisco',
      onChange: this.onLocationInputChange.bind(this),
      type: 'search',
      placeholder: 'Search Places...',
      autoFocus: true
    };

    const options = {
      bounds: this.props.general.boundLimit,
      componentRestrictions: {
        country: 'us'
      }
    };

    return (
      <div>
        <form onSubmit={this.handleLocationFormSubmit.bind(this)}>
          <PlacesAutocomplete
            inputProps={inputProps}
            options={options}
            onSelect={this.handleOnSelect.bind(this)}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this.handleOnSelect.bind(this)}
          />
          <button action="submit" className="btn btn-primary">
            Continue
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ map, general }) {
  return { address: map.address, general };
}

export default connect(mapStateToProps, actions)(Landing);
