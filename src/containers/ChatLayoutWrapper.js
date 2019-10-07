import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ChatLayoutRouter } from '../helpers/routers'
import Sidebar from '../components/Sidebar';

class ChatLayoutWrapper extends Component {

  render() {
    return (
      <div className='chat-layout'>
        <Sidebar/>
        <ChatLayoutRouter/>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  chat: store.chat
});

export default connect(mapStateToProps, null)(ChatLayoutWrapper);
