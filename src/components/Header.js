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
      user,
      auth: { error }
    } = this.props;
    const { pathname } = this.props.location;
    return (
      <div className="header">
        <div className="link-group">
          {pathname !== '/' && (
            <button onClick={() => history.goBack()}>
              <i className="fas fa-arrow-circle-left" />
            </button>
          )}
          |<NavLink to="/">Main</NavLink>|<NavLink to="/chat">Chat</NavLink>|
        </div>

        {!_.isEmpty(user) ? (
          <div className="hello">
            Hello, <NavLink to="/profile">{user.login}</NavLink>
            <button onClick={this.handleLogout}>
              <i className="fas fa-door-open" />
            </button>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <span className="form-error mr-2">{error}</span>
            <input type="text" ref={element => (this.inputLogin = element)} />
            <input type="password" ref={element => (this.inputPassword = element)} />
            <button onClick={this.handleSubmit}>Login</button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.chat.currentUser,
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
