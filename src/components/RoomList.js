import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { handleCreatingRoom, handleDeletingRoom } from '../store/api/webSockets/actions';
import _ from 'lodash';
import { handleGettingRooms } from '../store/chat';

class RoomList extends Component {
  componentDidMount() {
    this.props.handleGettingRooms();
  }

  handleCreateRoom = () => {
    !_.isEmpty(this.inputRoomName.value.trim()) && handleCreatingRoom(this.inputRoomName.value);
    this.inputRoomName.value = '';
  };

  handleDeleteRoom = (roomId, userId) => () => {
    handleDeletingRoom(roomId, userId);
  };

  render() {
    const {
      chat: { currentUser, chatRooms }
    } = this.props;
    return (
      <div className="room-list">
        <div className="d-flex align-items-center">
          <h3>Choose any room and enjoy the conversation!</h3>
          <div className="d-flex flex-column w-25 text-center ml-2">
            <h5>or</h5>
            <input
              type="text"
              name="RoomName"
              id="RoomName"
              ref={element => {
                this.inputRoomName = element;
              }}
            />
            <button className="btn" onClick={this.handleCreateRoom}>
              Create your own room!
            </button>
          </div>
        </div>
        <div className="list">
          {chatRooms && chatRooms.length
            ? chatRooms.map(room => {
                return (
                  <div className="room" key={room._id}>
                    <NavLink to={`/chat/${room._id}`}>
                      <span>{room.roomName}</span>
                      <span className="online">Online: {room.users.length}</span>
                    </NavLink>
                    {room.roomCreator === currentUser._id && (
                      <button
                        className="btn"
                        onClick={this.handleDeleteRoom(room._id, currentUser._id)}
                      >
                        Delete room
                      </button>
                    )}
                  </div>
                );
              })
            : ''}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  chat: store.chat
});

const mapDispatchToProps = {
  handleGettingRooms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomList);
