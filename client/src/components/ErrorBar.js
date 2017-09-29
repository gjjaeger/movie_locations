import React, { Component } from 'react';
import { connect } from 'react-redux';

class ErrorBar extends Component {
  renderContent() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span className="error-message">{this.props.errorMessage}</span>
        </div>
      );
    }
    return;
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ general }) {
  return { errorMessage: general.mapError };
}

export default connect(mapStateToProps)(ErrorBar);
