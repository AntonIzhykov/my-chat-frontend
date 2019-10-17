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
    const { auth } = this.props;
    return (
      <div className="content-wrapper">
        {!auth.isOnline && <Loader />}
        <App />
      </div>
    );
  }
}
const mapStateToProps = store => ({
  auth: store.auth
});

const mapDispatchToProps = {
  handleCheckCurrentUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentWrapper);
