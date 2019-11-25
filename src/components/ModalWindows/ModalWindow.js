import React from 'react';
import * as ReactDOM from 'react-dom';

const ModalWindow = ({ children, onClose, error, title }) => {
  const modalRoot = document.getElementById('modal-root');
  const closeModal = e => {
    e.target.className === 'modal-wrapper' && onClose && onClose();
  };
  return ReactDOM.createPortal(
    <div className="modal-wrapper" onClick={closeModal}>
      <div className="modal-window-wrapper">
        <div className="modal-window">
          {title && <h3 className="text-center w-100">{title}</h3>}
          {children}
          <div className="form-error">{error}</div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalWindow;
