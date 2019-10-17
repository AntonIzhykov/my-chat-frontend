import React from 'react';
import { withRouter } from 'react-router';

import 'assets/css/main.css';
import { AppRouter } from '../helpers';
import Header from './Header';
import { connect } from 'react-redux';
import Loader from './Loader';

class App extends React.Component {
  render() {
    const {
      auth: { isOnline }
    } = this.props;
    return (
      <div id="content" className="App">
        {!isOnline && <Loader />}
        <Header />
        <AppRouter online={isOnline} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.auth
});

export default withRouter(connect(mapStateToProps)(App));
