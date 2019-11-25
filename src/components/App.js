import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AppRouter } from '../helpers';
import Header from './Header';
import '../assets/css/main.css';

class App extends React.Component {
  render() {
    const {
      auth: { isOnline }
    } = this.props;
    return (
      <div id="content" className="App">
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
