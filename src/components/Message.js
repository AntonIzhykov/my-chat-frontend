import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

class Message extends Component {
  render() {
    const {
      user,
      message: {
        _id,
        author: {
          _id: authorId = '',
          avatar: { secure_url = '' } = {},
          login: authorLogin = ''
        } = {},
        messageBody = '',
        timeCreate = '',
        isEdited
      },
      theSameAuthor,
      handleEditMessage,
      handleClickName
    } = this.props;

    const avatarStyle = {
      backgroundImage: `url(${secure_url || ''})`
    };

    const isCurrentUser = authorId === user._id;

    return (
      <div
        className={`${theSameAuthor ? 'same-author' : ''} ${
          isCurrentUser ? 'is-current-user' : ''
        } message-wrapper`}
        key={_id}
      >
        <div className="info" onClick={isCurrentUser ? '' : handleClickName(authorLogin)}>
          <div className="avatar" style={avatarStyle} />
          <span className="nickname">{`${isCurrentUser ? 'You:' : `${authorLogin}:`}`}</span>
        </div>
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
