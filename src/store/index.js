import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import Notifications from './middlewares/Notifications';
import createRootReducer from './reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const history = createBrowserHistory();
const configureStore = () =>
  createStore(
    createRootReducer(history),
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(Notifications, thunk, routerMiddleware(history)))
      : applyMiddleware(Notifications, thunk, routerMiddleware(history))
  );

export const store = configureStore();
