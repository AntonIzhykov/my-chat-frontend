import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as wsActions from '../../store/api/webSockets/actions';
import _ from 'lodash';
import autosize from 'autosize';
import Messages from '../Messages';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class CurrentRoom extends Component {
  state = {
    editingMessage: '',
    showEmojiPanel: false
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
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const roomId = this.props.match.params.id;
      wsActions.handleLeavingRoom();
      wsActions.handleJoiningRoom(roomId);
      this.inputMessage.focus();
      autosize(this.inputMessage);
    }
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
    // if (!_.isEmpty(this.inputMessage.value.trim())) {
    //   for (let i = 2000; i > 0; i--) {
    //     wsActions.handleSendingMessage(this.inputMessage.value);
    //   }
    // }
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
    this.handleCancelEditing();
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
    if (e.keyCode === 27) {
      return this.handleCancelEditing();
    }
  };

  showEmojiPanel = () => {
    this.setState(
      {
        showEmojiPanel: true
      },
      () => document.addEventListener('click', this.closeEmojiPanel)
    );
  };

  closeEmojiPanel = e => {
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState(
        {
          showEmojiPanel: false
        },
        () => document.removeEventListener('click', this.closeEmojiPanel)
      );
    }
  };

  addEmoji = e => {
    this.inputMessage.value = this.inputMessage.value + e.native;
  };

  render() {
    const { room } = this.props;
    const { editingMessage, showEmojiPanel } = this.state;
    return (
      <div className="current-room">
        <div className="messages" ref={this.messagesRef}>
          {!_.isEmpty(room) && room.messages && room.messages.length > 0 && (
            <Messages
              messages={room.messages}
              handleEditMessage={this.handleEditMessage}
              handleDeleteMessage={this.handleDeleteMessage}
              handleClickName={this.handleClickName}
            />
          )}
        </div>
        <form onSubmit={this.handleSubmitMessage}>
          <textarea
            className={`${!_.isEmpty(editingMessage) ? 'editing' : ''} message-text`}
            ref={element => {
              this.inputMessage = element;
            }}
            rows={1}
            onKeyDown={this.keyDownListener}
            placeholder="Type your message"
          />
          {!!editingMessage && (
            <div className="editing-buttons">
              <span className="cursor-pointer" title="Cancel" onClick={this.handleCancelEditing}>
                <i className="far fa-window-close" />
              </span>
              <span
                className="cursor-pointer"
                title="Delete message"
                onClick={this.handleDeleteMessage(editingMessage)}
              >
                <i className="fas fa-trash" />
              </span>
            </div>
          )}

          <div className="right-part">
            <div className="emoji" onClick={this.showEmojiPanel}>
              <span className="cursor-pointer fz-20 m-0" onClick={this.showEmojiPanel}>
                {String.fromCodePoint(0x1f60a)}
              </span>
              {showEmojiPanel && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                  }}
                  ref={el => (this.emojiPicker = el)}
                >
                  <Picker
                    onSelect={this.addEmoji}
                    emojiTooltip={true}
                    title="WS-Chat"
                    emojiSize={24}
                  />
                </span>
              )}
            </div>
            <div className="send-message" onClick={this.handleSubmitMessage}>
              <span className="icon-send color-white absolute-center" />
            </div>
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
