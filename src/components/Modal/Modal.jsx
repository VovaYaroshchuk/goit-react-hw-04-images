import React from "react";
import { useEffect,  } from "react";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';


const modalRoot = document.querySelector('#modal-root');

const Modal = ({onClose, largeImageURL, imageRequest}) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
}, []); 

useEffect(() => {

  return () => {
  window.removeEventListener('keydown', handleKeyDown);}
} , []);

const handleKeyDown = event => {
  if (event.key === 'Escape') {
    onClose();
  }
}


const handleBackdropClick = event => {
  if (event.target === event.currentTarget) {
    onClose();
  }
}

return createPortal(
  <div className={styles.Overlay} onClick={handleBackdropClick}>
    <div className={styles.Modal}>
      <img src={largeImageURL} alt={imageRequest} />
    </div>
  </div>,
  modalRoot
);
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  imageRequest: PropTypes.string.isRequired,
}

export default Modal;