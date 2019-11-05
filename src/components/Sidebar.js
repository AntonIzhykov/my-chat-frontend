import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { history } from '../store';
import { handleCreatingRoom, handleDeletingRoom } from '../store/api/webSockets/actions';

class Sidebar extends Component {
  state = {
    chatRooms: [],
    createRoomFieldOpen: false
  };

  componentDidMount() {
    this.setState({
      chatRooms: this.props.chat.chatRooms
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    prevProps.chat.chatRooms !== this.props.chat.chatRooms &&
      this.setState({
        chatRooms: this.props.chat.chatRooms
      });
  }

  handleOpenCreateRoomField = () => {
    this.setState({
      createRoomFieldOpen: !this.state.createRoomFieldOpen
    });
  };

  handleCreateRoom = () => {
    !_.isEmpty(this.inputRoomName.value.trim()) && handleCreatingRoom(this.inputRoomName.value);
    this.inputRoomName.value = '';
    this.setState({
      createRoomFieldOpen: false
    });
  };

  handleDeleteRoom = (roomId, userId) => e => {
    e.preventDefault();
    handleDeletingRoom(roomId, userId);
  };

  handleCheckEnter = e => {
    if (e.key === 'Enter') {
      this.handleCreateRoom();
    }
  };

  render() {
    const {
      chat: { currentRoom = { _id: '' }, currentUser = {}, currentUser: { _id: userId = '' } = {} },
      location: { pathname }
    } = this.props;
    const lastRoom = currentUser.lastRoom ? currentUser.lastRoom : { _id: '' };
    const cRoom = currentRoom ? currentRoom : {};
    const { _id: currentRoomId = '', users = [] } = cRoom;
    const { _id: lastRoomId = '', roomName = '' } = lastRoom;
    const { createRoomFieldOpen, chatRooms } = this.state;
    return (
      <div id="sidebar" className="sidebar">
        {!_.isEmpty(currentUser) && lastRoomId && !pathname.includes(lastRoomId) && (
          <div className="last-room">
            <h5>Your last room:</h5>
            <NavLink onClick={() => history.push(`/chat/${lastRoomId}`)} to={`/chat/${lastRoomId}`}>
              {roomName}
            </NavLink>
          </div>
        )}

        {chatRooms && chatRooms.length > 0 && (
          <div className="rooms">
            <div className="d-flex align-items-center">
              <h5>Rooms:</h5>
              <span
                className={`${
                  createRoomFieldOpen ? 'icon-cross color-white' : 'icon-plus'
                } btn p-1 m-0 ml-1 cursor-pointer`}
                onClick={this.handleOpenCreateRoomField}
              />
              {createRoomFieldOpen && (
                <div className="room-creator ml-2">
                  <input
                    onKeyDown={this.handleCheckEnter}
                    type="text"
                    ref={element => {
                      this.inputRoomName = element;
                    }}
                  />
                  <span
                    className="cursor-pointer text-uppercase color-white ml-1"
                    onClick={this.handleCreateRoom}
                  >
                    add
                  </span>
                </div>
              )}
            </div>
            <div className="list-wrapper">
              <div className="list ">
                {chatRooms.map(room => {
                  return (
                    <NavLink key={room._id} to={`/chat/${room._id}`}>
                      {room.roomName}
                      <span>{room.users.length}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {pathname.includes(currentRoomId) && users && users.length > 0 && (
          <div className="room-users">
            <h5>Users in this room:</h5>
            <div className="list-wrapper">
              <div className="list">
                {users.map(user => {
                  return (
                    <span className="username" key={user._id}>
                      {userId === user._id ? 'You' : user.login}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="user-settings" onClick={() => history.push('/profile')}>
          <span>User settings</span>
          <span className="icon-cogs" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  chat: store.chat
});

export default withRouter(connect(mapStateToProps)(Sidebar));
