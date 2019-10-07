import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

class Message extends Component {
  render() {
    const {
      user,
      message: {
        _id,
        author,
        author: { login },
        messageBody,
        timeCreate,
        timeEdit,
        avatar,
        isEdited
      },
      handleEditMessage,
      handleDeleteMessage,
      handleClickName
    } = this.props;
    return (
      <div className="message-wrapper" key={_id}>
        <div className="avatar">{/*{avatar}*/}</div>
        <div className="message-container">
          <div className="up-line">
            <span className={`${author._id === user._id ? 'font-weight-lighter' : 'font-weight-bolder'} username`} onClick={handleClickName(login)}>
              {author._id === user._id ? "You:" : `${login}:`}
            </span>
            <div className="time-wrapper">
              {isEdited && (
                <span className="time edited">
                  <i className="fas fa-pencil-alt"/> edited {moment(timeEdit).format('HH:mm:ss')}
                </span>
              )}
              <span className="time">{moment(timeCreate).format('HH:mm')}</span>
            </div>
          </div>
          <div className="message-body">{messageBody}</div>
        </div>
        {author._id === user._id ? (
          <div className="btn-group">
            <button className='button' onClick={handleEditMessage(_id, messageBody)}>
              <i className="fas fa-edit"/>
            </button>
            <button className='button' onClick={handleDeleteMessage(_id)}>
              <i className="fas fa-trash"/>
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
  user: store.chat.currentUser
});

export default connect(mapStateToProps)(Message);
