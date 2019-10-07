import React from 'react';
import { Route, Switch } from 'react-router';
import ChatLayout from '../../containers/ChatLayoutWrapper';
import About from '../../components/About';

export const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={About} />
      <Route path="/chat" component={ChatLayout} />
    </Switch>
  )
};
