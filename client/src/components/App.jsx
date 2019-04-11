import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import './App.css';
import MainRoute from '../routers/MainRouter';

class App extends Component {
  render() {
    const { authed } = this.props;

    return (
      <div className="app">
        <div className="router">
          <MainRoute authed={authed} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authed: state.auth.isAuthenticated,
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(App);
