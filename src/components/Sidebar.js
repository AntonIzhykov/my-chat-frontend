import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { history } from '../store';
import { handleGettingRooms } from '../store/chat';
import { ModalWindow, RoomCreator, UserSettings } from './ModalWindows';

class Sidebar extends Component {
  state = {
    chatRooms: [],
    showRoomCreatorModal: false,
    showUserSettingsModal: false,
    showRoomSettingsModal: false
  };

  componentDidMount() {
    if (!this.props.chat.chatRooms.length) {
      this.props.handleGettingRooms();
    }
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

  toggleShowRoomCreator = () => {
    this.setState({
      showRoomCreatorModal: !this.state.showRoomCreatorModal
    });
  };

  toggleShowUserSettings = () => {
    this.setState({
      showUserSettingsModal: !this.state.showUserSettingsModal
    });
  };

  toggleShowRoomSettings = () => {
    this.setState({
      showRoomSettingsModal: !this.state.showRoomSettingsModal
    });
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
    const { showRoomCreatorModal, showUserSettingsModal, chatRooms } = this.state;
    return (
      <div id="sidebar" className="sidebar">
        {showRoomCreatorModal && (
          <ModalWindow title={'Create new room'} onClose={this.toggleShowRoomCreator}>
            <RoomCreator onClose={this.toggleShowRoomCreator} />
          </ModalWindow>
        )}
        {showUserSettingsModal && (
          <ModalWindow title={'User Settings'} onClose={this.toggleShowUserSettings}>
            <UserSettings onClose={this.toggleShowUserSettings} />
          </ModalWindow>
        )}

        {!_.isEmpty(currentUser) && lastRoomId && !pathname.includes(lastRoomId) && (
          <div className="last-room">
            <h5>Your last room:</h5>
            <NavLink onClick={() => history.push(`/chat/${lastRoomId}`)} to={`/chat/${lastRoomId}`}>
              <span>{roomName}</span>
            </NavLink>
          </div>
        )}
        {chatRooms && chatRooms.length > 0 && (
          <div className="rooms">
            <div className="d-flex align-items-center">
              <h5>Rooms:</h5>
              <span
                className={`${
                  showRoomCreatorModal ? 'icon-cross color-white' : 'icon-plus'
                } btn p-1 m-0 ml-1 cursor-pointer`}
                onClick={this.toggleShowRoomCreator}
              />
            </div>
            <div className="list-wrapper">
              <div className="list ">
                {chatRooms.map(room => {
                  return (
                    <NavLink key={room._id} to={`/chat/${room._id}`}>
                      <span className="overflow-hidden">{room.roomName}</span>
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

        <div className="user-settings" onClick={this.toggleShowUserSettings}>
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

const mapDispatchToProps = {
  handleGettingRooms
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sidebar)
);
