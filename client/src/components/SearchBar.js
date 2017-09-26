import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PlacesAutocomplete from 'react-places-autocomplete';

const google = window.google;

class Landing extends Component {
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
      value: this.props.address,
      onChange: this.onLocationInputChange.bind(this),
      type: 'search',
      placeholder: 'Search Places...',
      autoFocus: true
    };

    return (
      <div>
        <form onSubmit={this.handleLocationFormSubmit.bind(this)}>
          <PlacesAutocomplete
            inputProps={inputProps}
            option={options}
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

function mapStateToProps(state) {
  return { address: state.map.address };
}

export default connect(mapStateToProps, actions)(Landing);
