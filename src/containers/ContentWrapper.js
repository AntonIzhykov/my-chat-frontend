import React, { Component } from 'react';
import App from '../components/App';
import Loader from '../components/Loader';
import { connect } from 'react-redux';
import { handleCheckCurrentUser } from '../store/auth';
import { handleGettingRooms } from '../store/chat';
import Notifications from '../components/Notifications';

class ContentWrapper extends Component {
  componentDidMount() {
    this.props.handleCheckCurrentUser();
    this.props.handleGettingRooms();
  }

  render() {
    const {
      auth: { isOnline },
      chat: { currentUser: { _id } = {} }
    } = this.props;
    return (
      <div className="content-wrapper">
        {_id && !isOnline && <Loader />}
        <App />
        <Notifications />
      </div>
    );
  }
}
const mapStateToProps = store => ({
  auth: store.auth,
  chat: store.chat
});

const mapDispatchToProps = {
  handleCheckCurrentUser,
  handleGettingRooms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentWrapper);
