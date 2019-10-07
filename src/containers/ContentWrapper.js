import React, { Component } from 'react';
import App from '../components/App';
import Loader from '../components/Loader';
import { connect } from 'react-redux';

class ContentWrapper extends Component {

  render() {
    return (
      <div className="content-wrapper">
        {!this.props.chat.isOnline && <Loader/>}
        <App/>
      </div>
    );
  }
}
const mapStateToProps = store => ({
  chat: store.chat
});

export default connect(mapStateToProps)(ContentWrapper);
