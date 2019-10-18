import React, { Component } from 'react';
import { createMinDate, createMaxDate } from '../helpers';
import moment from 'moment';

class Report extends Component {
  state = {
    allMessagesHovered: false,
    allRoomsHovered: false,
    allUsersHovered: false,
    userMessagesHovered: false,
    userRoomsHovered: false
  };

  componentDidMount() {
    this.createSomeData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.createSomeData();
    }
  }

  handleClickOut = e => {
    e.target.className.includes('report-wrapper') && this.props.closeReport();
  };

  handleHover = e => {
    this.setState({
      [`${e.currentTarget.id}Hovered`]: true
    });
  };

  handleMouseLeave = e => {
    this.setState({
      [`${e.currentTarget.id}Hovered`]: false
    });
  };

  createSomeData = () => {
    const {
      report: { allRooms = [], allMessages = [], userMessages = [] }
    } = this.props;

    const allMessagesTimes = allMessages.map(message => moment(message.timeCreate));
    const firstMessage = createMinDate(allMessagesTimes);
    const lastMessage = createMaxDate(allMessagesTimes);

    const allMessagesTexts = allMessages
      .map(message => message.messageBody)
      .sort((a, b) => a.length - b.length);
    const longestMessage = allMessagesTexts[0];
    const shortestMessage = allMessagesTexts[allMessagesTexts.length - 1];

    const mostSpeakingRoom = allRooms.sort((a, b) => a.messages.length - b.messages.length)[
      allRooms.length - 1
    ];

    const userMessagesTimes = userMessages.map(message => moment(message.timeCreate));
    const userMessagesTexts = userMessages
      .map(message => message.messageBody)
      .sort((a, b) => a.length - b.length);
    const firstUserMessage = createMinDate(userMessagesTimes);
    const lastUserMessage = createMaxDate(userMessagesTimes);
    const longestUserMessage = userMessagesTexts[0];
    const shortestUserMessage = userMessagesTexts[userMessagesTexts.length - 1];

    this.setState({
      firstMessage,
      lastMessage,
      shortestMessage,
      longestMessage,
      firstUserMessage,
      lastUserMessage,
      longestUserMessage,
      shortestUserMessage,
      mostSpeakingRoom
    });
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

    const {
      allMessagesHovered,
      allRoomsHovered,
      allUsersHovered,
      userMessagesHovered,
      userRoomsHovered,
      firstMessage,
      lastMessage,
      shortestMessage,
      longestMessage,
      firstUserMessage,
      lastUserMessage,
      longestUserMessage,
      shortestUserMessage,
      mostSpeakingRoom: { roomName = '', messages = [] } = {}
    } = this.state;

    return (
      <div className={`${show ? 'd-flex' : 'd-none'} report-wrapper`} onClick={this.handleClickOut}>
        <div className="report">
          <div className="chat-report">
            <h4>The chat contains:</h4>
            <div
              onMouseEnter={this.handleHover}
              onMouseLeave={this.handleMouseLeave}
              id="allMessages"
              className="info-wrapper"
            >
              <span>{allMessages.length}</span> messages
              <div className={`${allMessagesHovered ? 'd-flex' : 'd-none'} info`}>
                <div>
                  first messages was created at <span> {firstMessage}</span>
                </div>
                <div>
                  last messages was created at <span>{lastMessage}</span>
                </div>
                <div>
                  the longest message is "<span>{longestMessage}</span>"
                </div>
                <div>
                  the shortest message is "<span>{shortestMessage}</span>"
                </div>
              </div>
            </div>
            <div
              onMouseEnter={this.handleHover}
              onMouseLeave={this.handleMouseLeave}
              id="allRooms"
              className="info-wrapper"
            >
              in <span>{allRooms.length}</span> rooms.
              <div className={`${allRoomsHovered ? 'd-flex' : 'd-none'} info`}>
                <div>
                  The most speaking room is <span>{roomName}</span>
                </div>
                <div>
                  And it contains <span>{messages.length}</span> messages
                </div>
              </div>
            </div>
            <div
              onMouseEnter={this.handleHover}
              onMouseLeave={this.handleMouseLeave}
              id="allUsers"
              className="info-wrapper"
            >
              There are <span>{allUsers.length}</span> users.
              <div className={`${allUsersHovered ? 'd-flex' : 'd-none'} info`}>lalala</div>
            </div>
          </div>
          <div className="user-report">
            <h4>You personally created:</h4>
            <div
              onMouseEnter={this.handleHover}
              onMouseLeave={this.handleMouseLeave}
              id="userMessages"
              className="info-wrapper"
            >
              <span>{userMessages.length}</span> messages
              <div className={`${userMessagesHovered ? 'd-flex' : 'd-none'} info`}>
                <div>
                  your first messages was created at <span>{firstUserMessage}</span>
                </div>
                <div>
                  your last messages was created at <span>{lastUserMessage}</span>
                </div>
                <div>
                  your longest message is "<span>{longestUserMessage}</span>"
                </div>
                <div>
                  your shortest message is "<span>{shortestUserMessage}</span>"
                </div>
              </div>
            </div>
            <div
              onMouseEnter={this.handleHover}
              onMouseLeave={this.handleMouseLeave}
              id="userRooms"
              className="info-wrapper"
            >
              and <span>{userRooms.length}</span> room
              <div className={`${userRoomsHovered ? 'd-flex' : 'd-none'} info`}>lalala</div>
            </div>
            <div>
              Have a nice day, <span>{user.login}</span>!
            </div>
          </div>
          <button onClick={closeReport}>Close</button>
        </div>
      </div>
    );
  }
}

export default Report;
