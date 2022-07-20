import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, data, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalContent>
        <img src={data.largeImg} alt={data.tags} />
        {children}
      </ModalContent>
    </Backdrop>,
    modalRoot
  );
}

export { Modal };

Modal.protoType = {
  data: PropTypes.shape({
    largeImg: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
};
