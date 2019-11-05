import React from 'react';
import { Route, Switch } from 'react-router';
import ChatLayout from '../../containers/ChatLayoutWrapper';
import About from '../../components/About';
import Profile from '../../components/Profile';
import PrivateRoute from '../../components/PrivatRoute';
import RoomList from '../../components/RoomList';
import CurrentRoom from '../../containers/CurrentRoom/CurrentRoom';

export const AppRouter = props => {
  return (
    <Switch>
      <Route exact path="/" component={About} />
      <PrivateRoute path="/chat" component={ChatLayout} online={props.online} />
      <PrivateRoute exact path="/profile" component={Profile} online={props.online} />
    </Switch>
  );
};

export const ChatLayoutRouter = props => (
  <Switch>
    <Route exact path="/chat" component={RoomList} />
    <PrivateRoute path="/chat/:id" component={CurrentRoom} online={props.online} />
  </Switch>
);
