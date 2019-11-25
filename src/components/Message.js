import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Tippy from '@tippy.js/react';

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
      handleDeleteMessage,
      handleQuoteMessage,
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
        <div className="info" onClick={isCurrentUser ? () => {} : handleClickName(authorLogin)}>
          <div className="avatar" style={avatarStyle} />
          <span className="nickname">{`${isCurrentUser ? 'You:' : `${authorLogin}:`}`}</span>
        </div>
        <Tippy
          content={
            <>
              {isCurrentUser && (
                <span
                  className="fz-12 icon-bin cursor-pointer mr-2"
                  onClick={handleDeleteMessage(_id)}
                />
              )}
              {isCurrentUser && (
                <span
                  className="fz-12 icon-pencil2 cursor-pointer mr-2"
                  onClick={handleEditMessage(_id, messageBody)}
                />
              )}
              <span
                className="fz-12 icon-quotes-right cursor-pointer"
                onClick={handleQuoteMessage(messageBody)}
              />
            </>
          }
          placement="right-start"
          arrow={false}
          theme="default"
          interactive={true}
          distance={7}
          inertia={true}
          appendTo={document.body}
        >
          <div className="message-body">{messageBody}</div>
        </Tippy>
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
