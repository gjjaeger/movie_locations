import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import MovieTile from './MovieTile';

//components purpose is to highlight the locations where a movie was filmed on hover
class MovieList extends Component {
  renderContent() {
    const movies = this.props.movieList;

    return _.map(movies, movie => {
      return <MovieTile hoveredMovie={movie} key={movie._id} />;
    });
  }
  render() {
    return <div className="movie-list">{this.renderContent.bind(this)()}</div>;
  }
}

function mapStateToProps({ movies }) {
  return {
    movieList: movies.list
  };
}

export default connect(mapStateToProps)(MovieList);
