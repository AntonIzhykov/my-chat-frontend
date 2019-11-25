import React from 'react';
import { Route, Switch } from 'react-router';
import ChatLayout from '../../containers/ChatLayoutWrapper';
import About from '../../components/About';
import Profile from '../../components/Profile';
import PrivateRoute from '../../components/PrivatRoute';
import RoomList from '../../components/RoomList';
import CurrentRoom from '../../containers/CurrentRoom';

export const AppRouter = ({ online }) => {
  return (
    <Switch>
      <Route exact path="/" component={About} />
      <PrivateRoute path="/chat" component={ChatLayout} online={online} />
      <PrivateRoute exact path="/profile" component={Profile} online={online} />
    </Switch>
  );
};

export const ChatLayoutRouter = ({ online }) => (
  <Switch>
    <Route exact path="/chat" component={RoomList} />
    <PrivateRoute path="/chat/:id" component={CurrentRoom} online={online} />
  </Switch>
);
