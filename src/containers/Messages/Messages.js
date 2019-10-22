import React, { Component } from 'react';
import moment from 'moment';
import Message from '../../components/Message';

class Messages extends Component {
  render() {
    const { messages, handleEditMessage, handleDeleteMessage, handleClickName } = this.props;

    return messages.map((message, i) => {
      const prevMessage = i > 0 ? messages[i - 1] : null;
      const currentDate = moment(new Date(message.timeCreate));
      const prevDate = prevMessage
        ? moment(new Date(prevMessage.timeCreate))
        : moment(new Date(message.timeCreate));

      const sameAuthor = prevMessage ? prevMessage.author._id === message.author._id : false;

      return (
        <React.Fragment key={message._id}>
          {!!prevDate && moment(currentDate).diff(moment(prevDate), 'days') !== 0 && (
            <div className="message-wrapper text-center">
              ----- {currentDate.format('DD-MM-YYYY')} -----
            </div>
          )}
          <Message
            key={message._id}
            theSameAuthor={sameAuthor}
            message={message}
            handleEditMessage={handleEditMessage}
            handleDeleteMessage={handleDeleteMessage}
            handleClickName={handleClickName}
          />
        </React.Fragment>
      );
    });
  }
}

export default Messages;
