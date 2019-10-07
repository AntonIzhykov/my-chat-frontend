import React from 'react';
import { withRouter } from 'react-router';

import 'assets/css/main.css';
import { AppRouter } from '../helpers/routers';
import Header from './Header';

class App extends React.Component{

  render() {
    return (
      <div id="content" className="App">
        <Header />
        <AppRouter />
      </div>
    );
  }
}

export default withRouter(App);
