import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PlacesAutocomplete from 'react-places-autocomplete';

class SearchBar extends Component {
  //set map center to address location
  setCenter(address) {
    address = address ? address : { address: 'San Francisco, USA' };
    this.props.setCenter(address);
  }

  handleOnSelect(address) {
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
      value: this.props.address ? this.props.address : '',
      onChange: this.onLocationInputChange.bind(this),
      type: 'search',
      placeholder: 'Search Places...',
      autoFocus: true
    };

    //program search to favour US suggestions
    const options = {
      bounds: this.props.general.boundLimit,
      componentRestrictions: {
        country: 'us'
      }
    };

    return (
      <div className="search-bar">
        <form>
          <PlacesAutocomplete
            inputProps={inputProps}
            options={options}
            onSelect={this.handleOnSelect.bind(this)}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this.handleOnSelect.bind(this)}
            className="search-input"
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ map, general }) {
  return { address: map.address, general };
}

export default connect(mapStateToProps, actions)(SearchBar);
