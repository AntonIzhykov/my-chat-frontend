import React from 'react';
import { Route, Switch } from 'react-router';
import RoomList from '../../components/RoomList';
import CurrentRoom from '../../containers/CurrentRoom';

export const ChatLayoutRouter = () => {
  return (
    <Switch>
      <Route exact path='/chat' component={RoomList} />
      <Route path="/chat/:id" component={CurrentRoom} />
    </Switch>
  )
};
