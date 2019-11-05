import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleCreatingRoom } from '../store/api/webSockets/actions';
import _ from 'lodash';
import { handleGettingRooms } from '../store/chat';

class RoomList extends Component {
  state = {
    createRoomFieldOpen: false
  };

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

  handleCheckEnter = e => {
    if (e.key === 'Enter') {
      this.handleCreateRoom();
    }
  };

  render() {
    const { createRoomFieldOpen } = this.state;
    return (
      <div className="room-list">
        <h3>It looks like you haven't been in any room yet...</h3>
        <h4>Choose any room and enjoy the conversation!</h4>
        <div className="room-creator-wrapper">
          <h5 className="d-inline m-0">Create new room</h5>
          <span
            className={`${
              createRoomFieldOpen ? 'icon-cross' : 'icon-plus'
            } btn p-1 m-0 ml-1 cursor-pointer`}
            onClick={this.handleOpenCreateRoomField}
          />
          {createRoomFieldOpen && (
            <div className="room-creator position-absolute mt-1 d-flex">
              <input
                type="text"
                onKeyDown={this.handleCheckEnter}
                ref={element => {
                  this.inputRoomName = element;
                }}
              />
              <button className="btn p-1 m-0" onClick={this.handleCreateRoom}>
                add
              </button>
            </div>
          )}
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
