import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGettingRooms } from '../store/chat';
import { ModalWindow, RoomCreator } from './ModalWindows';

class RoomList extends Component {
  state = {
    showRoomCreatorModal: false
  };

  toggleShowRoomCreator = () => {
    this.setState({
      showRoomCreatorModal: !this.state.showRoomCreatorModal
    });
  };

  render() {
    const { showRoomCreatorModal } = this.state;
    return (
      <div className="room-list">
        {showRoomCreatorModal && (
          <ModalWindow title={'Create new room'} onClose={this.toggleShowRoomCreator}>
            <RoomCreator onClose={this.toggleShowRoomCreator} />
          </ModalWindow>
        )}
        <h3>It looks like you haven't been in any room yet...</h3>
        <h4>Choose any room and enjoy the conversation!</h4>
        <div className="room-creator-wrapper">
          <h5 className="d-inline m-0">Create new room</h5>
          <span
            className={`${
              showRoomCreatorModal ? 'icon-cross' : 'icon-plus'
            } btn p-1 m-0 ml-1 cursor-pointer`}
            onClick={this.toggleShowRoomCreator}
          />
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
