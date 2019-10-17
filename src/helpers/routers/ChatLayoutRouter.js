import React from 'react';
import { Route, Switch } from 'react-router';
import RoomList from '../../components/RoomList';
import CurrentRoom from '../../containers/CurrentRoom';
import PrivateRoute from '../../components/PrivatRoute';

export const ChatLayoutRouter = props => (
  <Switch>
    <Route exact path="/chat" component={RoomList} />
    <PrivateRoute path="/chat/:id" component={CurrentRoom} online={props.online} />
  </Switch>
);
