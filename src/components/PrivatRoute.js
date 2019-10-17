import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, online, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      online && <Component {...props} />
    )}
  />
);

export default PrivateRoute;
