import React, { Component } from 'react';

class Report extends Component {
  handleClickOut = e => {
    e.target.className.includes('report-wrapper') && this.props.closeReport();
  };

  render() {
    const {
      report: {
        allRooms = [],
        allMessages = [],
        allUsers = [],
        user = {},
        userRooms = [],
        userMessages = []
      },
      closeReport,
      show
    } = this.props;
    return (
      <div className={`${show ? 'd-flex' : 'd-none'} report-wrapper`} onClick={this.handleClickOut}>
        <div className="report">
          <div className="chat-report">
            <h4>The chat contains:</h4>
            <div>{allMessages.length} messages</div>
            <div>in {allRooms.length} rooms. </div>
            <div>There are {allUsers.length} users.</div>
          </div>
          <div className="user-report">
            <h4>You personally created:</h4>
            <div>{userMessages.length} messages</div>
            <div>and {userRooms.length} room</div>
            <div>Have a nice day, {user.login}!</div>
          </div>
          <button onClick={closeReport}>Close</button>
        </div>
      </div>
    );
  }
}

export default Report;
