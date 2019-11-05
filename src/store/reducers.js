import { reducer as notifications } from 'react-notification-system-redux';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { chat } from './chat';
import { auth } from './auth';

export default history =>
  combineReducers({
    auth,
    chat,
    notifications,
    router: connectRouter(history)
  });
