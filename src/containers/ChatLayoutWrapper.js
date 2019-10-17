import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ChatLayoutRouter } from '../helpers/routers';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';

class ChatLayoutWrapper extends Component {
  render() {
    const {
      auth: { isOnline }
    } = this.props;
    return (
      <div className="chat-layout">
        {!isOnline && <Loader />}
        <Sidebar />
        <ChatLayoutRouter online={isOnline} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.auth
});

export default connect(
  mapStateToProps,
  null
)(ChatLayoutWrapper);
