import React, { Component } from 'react';

class MessagesLayout extends Component {
  render() {
    return (
      <div className='position-relative col-8 full-size d-flex flex-column'>
        {this.props.children}
        {/*Messages*/}
        <div className="w-100 h-auto bg-light">
          

        </div>
      </div>
    );
  }
}

export default MessagesLayout;
