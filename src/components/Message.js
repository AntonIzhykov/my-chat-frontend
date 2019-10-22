import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

class Message extends Component {
  render() {
    const {
      user,
      authors,
      message: { _id, author, messageBody, timeCreate, isEdited },
      theSameAuthor,
      handleEditMessage,
      handleClickName
    } = this.props;

    const messageAuthor = authors.filter(user => user._id === author._id)[0];

    const avatarStyle = {
      backgroundImage: `url(${messageAuthor.avatar ? messageAuthor.avatar.secure_url : ''})`
    };

    const isCurrentUser = messageAuthor._id === user._id;

    return (
      <div
        className={`${theSameAuthor ? 'same-author' : ''} ${
          isCurrentUser ? 'is-current-user' : ''
        } message-wrapper`}
        key={_id}
      >
        {!theSameAuthor && (
          <>
            <div className="avatar" style={avatarStyle} />
            <span className="nickname" onClick={handleClickName(messageAuthor.login)}>
              {`${isCurrentUser ? 'You:' : `${messageAuthor.login}:`}`}
            </span>
          </>
        )}
        <div className="message-body">
          {messageBody}
          {isCurrentUser && (
            <span
              className="msg-edit icon-pencil2"
              title="Edit message"
              onClick={handleEditMessage(_id, messageBody)}
            />
          )}
        </div>
        <div className="time-wrapper">
          {isEdited && <span className="editing-time icon-pencil">edited</span>}
          <span className="time">{moment(timeCreate).format('HH:mm')}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.chat.currentUser,
  authors: store.chat.currentRoom.authors
});

export default connect(mapStateToProps)(Message);
