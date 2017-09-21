import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GoogleMap from './Map';

class Landing extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  renderContent() {
    if (this.props.movies.length > 1) {
      return this.props.movies.map(movie => {
        return <div key={movie.id}>{movie.title}</div>;
      });
    }
    return <div>Loading...</div>;
  }
  render() {
    return(
      <div>{this.renderContent()}</div>;
      <GoogleMap lon={lon} lat={lat} />
    )
  }
}

function mapStateToProps({ movies }) {
  return { movies };
}

export default connect(mapStateToProps, actions)(Landing);
