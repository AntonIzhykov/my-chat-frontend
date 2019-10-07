import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="about">
        <h3>Welcome to My Chat!</h3>
        <p className='description'>
          The goal of this project - create some chat api with webSockets and node.js as a server. I try to use new
          futures such as unit testing and webSockets.
        </p>
      </div>
    );
  }
}

export default About;
