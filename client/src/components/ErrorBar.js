import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ErrorBar extends Component {
  render() {
    return (
      <div>
        <span className="error-message">{this.props.errorMessage}</span>
      </div>
    );
  }
}

function mapStateToProps({ general }) {
  return { errorMessage: general.mapError };
}

export default connect(mapStateToProps)(ErrorBar);
