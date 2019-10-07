import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';

import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';

const redux_devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export const history = createBrowserHistory();

const configureStore = () => compose(applyMiddleware(
  routerMiddleware(history),
))(createStore)(createRootReducer(history), redux_devtools);

export const store = configureStore();
