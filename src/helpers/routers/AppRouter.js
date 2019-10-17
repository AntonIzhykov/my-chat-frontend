import React from 'react';
import { Route, Switch } from 'react-router';
import ChatLayout from '../../containers/ChatLayoutWrapper';
import About from '../../components/About';
import Profile from '../../components/Profile';
import PrivateRoute from '../../components/PrivatRoute';

export const AppRouter = props => {
  return (
    <Switch>
      <Route exact path="/" component={About} />
      <Route path="/chat" component={ChatLayout} />
      <PrivateRoute exact path="/profile" component={Profile} online={props.online} />
    </Switch>
  );
};
