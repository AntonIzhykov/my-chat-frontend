import React, { Component } from 'react';
import App from '../components/App';
import Loader from '../components/Loader';
import { connect } from 'react-redux';
import { handleCheckCurrentUser } from '../store/auth';
class ContentWrapper extends Component {
  componentDidMount() {
    this.props.handleCheckCurrentUser();
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
      </div>
    );
  }
}
const mapStateToProps = store => ({
  auth: store.auth,
  chat: store.chat
});

const mapDispatchToProps = {
  handleCheckCurrentUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentWrapper);
