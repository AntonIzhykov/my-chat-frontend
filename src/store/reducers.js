import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { chat } from './chat';
import { auth } from './auth';

export default history => combineReducers({
  router: connectRouter(history),
  chat,
  auth
});
