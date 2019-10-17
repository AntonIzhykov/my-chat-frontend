import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { history } from '../store';

class Sidebar extends Component {
  render() {
    const {
      chatRooms,
      currentRoom: { _id, users },
      currentUser,
      currentUser: { lastRoom = '' } = {}
    } = this.props.chat;
    const { pathname } = this.props.location;
    return (
      <div id="sidebar" className="sidebar">
        {pathname === '/chat' && chatRooms && chatRooms.length && (
          <React.Fragment>
            <h5>There are such room</h5>
            <ul>
              {chatRooms.map(room => {
                return (
                  <li key={room._id}>
                    <NavLink to={`/chat/${room._id}`}>#{room.roomName}</NavLink>
                  </li>
                );
              })}
            </ul>
            <p>--------------------------</p>
          </React.Fragment>
        )}
        {pathname.includes(_id) && users && users.length && (
          <React.Fragment>
            <h5>Users in the room:</h5>
            <ul>
              {users.map(user => {
                return (
                  <li className="username" key={user._id}>
                    {user.login}
                  </li>
                );
              })}
            </ul>
            <p>--------------------------</p>
          </React.Fragment>
        )}
        {!_.isEmpty(currentUser) && (
          <React.Fragment>
            <h5>Your last room:</h5>
            <NavLink
              onClick={() => history.push(`/chat/${lastRoom._id}`)}
              to={`/chat/${lastRoom._id}`}
            >
              {lastRoom.roomName}
            </NavLink>
            <p>--------------------------</p>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  chat: store.chat
});

export default withRouter(connect(mapStateToProps)(Sidebar));
