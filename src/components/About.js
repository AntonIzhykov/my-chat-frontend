import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGettingReport } from '../store/auth';
import Report from './Report';
import Loader from './Loader';
class About extends Component {
  state = {
    showReport: false
  };

  handleGetInfo = () => {
    this.props.handleGettingReport();
    this.setState({
      showReport: true
    });
  };

  handleCloseReport = () => {
    this.setState({
      showReport: false
    });
  };

  render() {
    const { report, loading } = this.props.auth;
    const { showReport } = this.state;
    return (
      <div className="about">
        {!!showReport && loading ? (
          <Loader />
        ) : (
          <Report report={report} show={showReport} closeReport={this.handleCloseReport} />
        )}
        <h3>Welcome to My Chat!</h3>
        <p className="description">
          The goal of this project - create some chat api with webSockets and node.js as a server. I
          try to use new futures such as unit testing and webSockets.
        </p>
        <button onClick={this.handleGetInfo}>Get report</button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.auth
});

const mapDispatchToProps = {
  handleGettingReport
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
