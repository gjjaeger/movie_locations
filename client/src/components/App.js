import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing';

class App extends Component {
  // componentDidMount() {
  //   this.props.fetchMovies();
  // }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Route exact path="/" component={Landing} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
