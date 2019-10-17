import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

class Message extends Component {
  render() {
    const {
      user,
      authors,
      message: { _id, author, messageBody, timeCreate, timeEdit, isEdited },
      handleEditMessage,
      handleDeleteMessage,
      handleClickName
    } = this.props;

    const messageAuthor = authors.filter(user => user._id === author._id)[0];

    return (
      <div
        className={`${messageAuthor._id === user._id ? 'flex-row-reverse' : ''} message-wrapper`}
        key={_id}
      >
        <div className="avatar">
          {messageAuthor && messageAuthor.avatar && (
            <img src={messageAuthor.avatar.secure_url} className="full-size" alt="avatar" />
          )}
        </div>
        <div className="message-container">
          <div className={`${messageAuthor._id === user._id ? 'flex-row-reverse' : ''} up-line`}>
            <span
              className={`${
                messageAuthor._id === user._id ? 'font-weight-lighter' : 'font-weight-bolder'
              } username`}
              onClick={handleClickName(messageAuthor.login)}
            >
              {messageAuthor._id === user._id ? 'You:' : `${messageAuthor.login}:`}
            </span>
            <div className="time-wrapper">
              {isEdited && (
                <span className="time edited">
                  <i className="fas fa-pencil-alt" /> edited {moment(timeEdit).format('HH:mm:ss')}
                </span>
              )}
              <span className="time">{moment(timeCreate).format('HH:mm')}</span>
            </div>
          </div>
          <div className="message-body">{messageBody}</div>
        </div>
        {messageAuthor._id === user._id ? (
          <div className="btn-group">
            <button className="button" onClick={handleEditMessage(_id, messageBody)}>
              <i className="fas fa-edit" />
            </button>
            <button className="button" onClick={handleDeleteMessage(_id)}>
              <i className="fas fa-trash" />
            </button>
          </div>
        ) : (
          <div className="btn-group" />
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.chat.currentUser,
  authors: store.chat.currentRoom.authors
});

export default connect(mapStateToProps)(Message);
