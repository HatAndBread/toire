import React from 'react';
import { useContext } from 'react';
import { Context } from '../../pages/home';
import '../../../../assets/stylesheets/components/modal.css';
import closerPath from '../../../../assets/images/cross.png';

const Modal = ({ onClose, content, title }) => {
  const context = useContext(Context);
  return (
    <div className="modal-container">
      <div className=""></div>
      <div className="modal-box">
        <div className="closer-container">
          <img
            src={closerPath}
            alt="X"
            className="closer"
            onClick={() => {
              context.setOpenModal(null);
              if (onClose && typeof onClose === 'function') {
                onClose();
              }
            }}
          ></img>
        </div>
        {title && (
          <div className="title-container">
            <h2>{title}</h2>
          </div>
        )}
        {content}
      </div>
    </div>
  );
};

export default Modal;
