import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as wsActions from '../store/api/webSockets/actions';
import _ from 'lodash';
import moment from 'moment/moment';
import autosize from 'autosize';
import Message from '../components/Message';

class CurrentRoom extends Component {
  state = {
    editingMessage: ''
  };

  messagesRef = React.createRef();

  componentDidMount() {
    this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
    const roomId = this.props.match.params.id;
    wsActions.handleJoiningRoom(roomId);
    this.inputMessage.focus();
    autosize(this.inputMessage);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
  }

  componentWillUnmount() {
    wsActions.handleLeavingRoom();
  }

  handleCancelEditing = () => {
    this.setState({
      editingMessage: ''
    });
    this.inputMessage.value = '';
    this.messagesRef.current.scrollTop =
      this.messagesRef.current.scrollHeight + this.messagesRef.current.clientHeight;
  };

  handleSubmitMessage = e => {
    if (e) e.preventDefault();
    const clean = () => {
      this.inputMessage.value = '';
      this.messagesRef.current.scrollTop =
        this.messagesRef.current.scrollHeight + this.messagesRef.current.clientHeight;
    };
    if (!_.isEmpty(this.state.editingMessage) && !_.isEmpty(this.inputMessage.value.trim())) {
      wsActions.handleEditingMessage(this.inputMessage.value, this.state.editingMessage);
      this.setState({
        editingMessage: ''
      });
      clean();
      autosize(this.inputMessage);
      return;
    }
    !_.isEmpty(this.inputMessage.value.trim()) &&
      wsActions.handleSendingMessage(this.inputMessage.value);
    clean();
    autosize(this.inputMessage);
  };

  handleClickName = name => () => {
    this.inputMessage.value += `${name}, `;
    this.inputMessage.focus();
  };

  handleDeleteMessage = messageId => () => {
    wsActions.handleDeletingMessage(messageId);
  };

  handleEditMessage = (messageId, text) => () => {
    this.setState({
      editingMessage: messageId
    });
    this.inputMessage.value = text;
    this.inputMessage.focus();
    autosize(this.inputMessage);
  };

  keyDownListener = e => {
    if (e.keyCode === 13) {
      return e.ctrlKey && e.keyCode === 13
        ? (this.inputMessage.value += `\n`)
        : this.handleSubmitMessage(e);
    }
  };

  render() {
    const { room } = this.props;
    const { editingMessage } = this.state;
    return (
      <div className="current-room">
        <h3>{room.roomName}</h3>
        <div className="messages" ref={this.messagesRef}>
          {!_.isEmpty(room) &&
            room.messages.length > 0 &&
            room.messages.map((message, i) => {
              const currentDate = moment(new Date(message.timeCreate));
              const prevDate =
                i > 0
                  ? moment(new Date(room.messages[i - 1].timeCreate))
                  : moment(new Date(message.timeCreate));
              return (
                <React.Fragment key={message._id}>
                  {prevDate && moment(currentDate).diff(moment(prevDate), 'days') !== 0 && (
                    <div className="text-center">
                      ----- {currentDate.format('DD-MM-YYYY')} -----
                    </div>
                  )}
                  <Message
                    message={message}
                    handleEditMessage={this.handleEditMessage}
                    handleDeleteMessage={this.handleDeleteMessage}
                    handleClickName={this.handleClickName}
                  />
                </React.Fragment>
              );
            })}
        </div>
        <form
          className="d-flex justify-content-between position-relative"
          onSubmit={this.handleSubmitMessage}
        >
          <textarea
            className="message-text"
            ref={element => {
              this.inputMessage = element;
            }}
            rows={1}
            onKeyDown={this.keyDownListener}
            placeholder="Enter your message"
          />
          <div className="btn-group">
            {!_.isEmpty(editingMessage) && (
              <button className="send-message" onClick={this.handleCancelEditing}>
                Cancel
              </button>
            )}
            <button type="submit" className="send-message">
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  room: store.chat.currentRoom
});

export default connect(mapStateToProps)(CurrentRoom);
