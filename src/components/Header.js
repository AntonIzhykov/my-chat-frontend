import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as wsActions from '../store/api/webSockets/actions';
import TokenStorage from '../store/api/token';
import { handleAuthentication } from '../store/auth';
import Tippy from '@tippy.js/react';
import { ModalWindow, Authentication, RoomSettings } from './ModalWindows';

class Header extends Component {
  state = {
    showAuthModal: false,
    showRoomSettingsModal: false
  };

  handleLogout = () => {
    wsActions.handleLeavingChat();
    TokenStorage.removeItemInLocalStorage();
  };

  toggleAuthModal = () => {
    this.setState({
      showAuthModal: !this.state.showAuthModal
    });
  };

  toggleRoomSettingsModal = () => {
    this.setState({
      showRoomSettingsModal: !this.state.showRoomSettingsModal
    });
  };

  render() {
    const {
      chat: {
        currentUser: { _id: userId },
        currentRoom,
        currentRoom: { roomCreator }
      },
      auth: { error = '' },
      handleAuthentication
    } = this.props;
    let errorMsg = error;
    const { pathname } = this.props.location;
    const { showAuthModal, showRoomSettingsModal } = this.state;
    return (
      <div className="header">
        {showAuthModal && (
          <ModalWindow title="Sign in" error={errorMsg} onClose={this.toggleAuthModal}>
            <Authentication
              handleAuthentication={handleAuthentication}
              closeModal={this.toggleAuthModal}
            />
          </ModalWindow>
        )}
        {showRoomSettingsModal && (
          <ModalWindow title="Room settings" onClose={this.toggleRoomSettingsModal}>
            <RoomSettings
              room={currentRoom}
              userId={userId}
              closeModal={this.toggleRoomSettingsModal}
            />
          </ModalWindow>
        )}
        <div className="chat-name">
          <Link to="/">WS chat</Link>
        </div>
        <div className="right-part">
          <div className="chat-logo">Logo</div>
          <div className="chat-settings">
            {currentRoom && pathname.includes(currentRoom._id) && roomCreator === userId && (
              <div className="button-wrapper">
                <Tippy content="Room settings" theme="default">
                  <span onClick={this.toggleRoomSettingsModal} className="icon-cog" />
                </Tippy>
              </div>
            )}
            <div className="button-wrapper">
              {!!userId ? (
                <Tippy content="Leave chat" theme="default">
                  <span onClick={this.handleLogout} className="icon-enter" />
                </Tippy>
              ) : (
                <span className="icon-user-plus" onClick={this.toggleAuthModal} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  chat: store.chat,
  auth: store.auth
});

const mapDispatchToProps = {
  handleAuthentication
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
