import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as wsActions from '../store/api/webSockets/actions';
import TokenStorage from '../store/api/token';
import { history } from '../store';
import { handleAuthentication } from '../store/auth';

class Header extends Component {
  handleSubmit = e => {
    if (e) e.preventDefault();
    const name = this.inputLogin.value;
    const pass = this.inputPassword.value;
    if (name && pass) {
      this.props.handleAuthentication(name, pass);
    }
  };

  handleLogout = () => {
    wsActions.handleLeavingChat();
    TokenStorage.removeItemInLocalStorage();
  };

  render() {
    const {
      chat: { currentUser: user, currentRoom },
      auth: { error, isOnline }
    } = this.props;
    const { pathname } = this.props.location;
    const h2 =
      pathname === '/'
        ? 'Welcome!'
        : pathname === '/chat'
        ? 'Room list'
        : pathname === '/profile'
        ? ' Profile settings'
        : currentRoom
        ? `#${currentRoom.roomName}`
        : '';
    return (
      <div className="header">
        <div className="link-group">
          {pathname === '/' ? (
            <span className="mr-2" />
          ) : (
            <span className="icon-undo2 fz-16 cursor-pointer" onClick={() => history.goBack()} />
          )}
          <NavLink to="/">
            <span className="icon-home fz-20"> Main</span>
          </NavLink>
          {isOnline && (
            <NavLink to="/chat">
              <span className="icon-bubbles4 fz-24"> Chat</span>
            </NavLink>
          )}
        </div>
        <div>
          <h2 className={`${pathname === '/profile' && 'icon-cogs'}`}>{h2}</h2>
        </div>
        {!_.isEmpty(user) ? (
          <div className="hello fz-24">
            <NavLink to="/profile">
              <span className="icon-user-tie fz-24"> {user.login}</span>
            </NavLink>
            <span
              onClick={this.handleLogout}
              className="icon-enter btn bg-reverse fz-24 cursor-pointer"
            />
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <span className="form-error mr-2">{error}</span>
            <input type="text" ref={element => (this.inputLogin = element)} />
            <input type="password" ref={element => (this.inputPassword = element)} />
            <button className="btn" onClick={this.handleSubmit}>
              Login
            </button>
          </form>
        )}
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
