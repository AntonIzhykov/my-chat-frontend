import React from 'react';
import * as ReactDOM from 'react-dom';

const Loader = () => {
  const modalRoot = document.getElementById('modal-root');
  return ReactDOM.createPortal(
    <div className="loader-layout">
      <div className="loader-wrapper">
        <div className="loader" />
      </div>
    </div>,
    modalRoot
  );
};

export default Loader;
