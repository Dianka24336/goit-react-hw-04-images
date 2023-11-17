import { useEffect } from 'react';
import { Overlay, StyledModal } from './Modal.styled';

export const Modal = ({ largeImages, images, onCloseModal }) => {
  useEffect(() => {
    const onKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onCloseModal]);

  const onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={onOverlayClick}>
      <StyledModal>
        <img src={largeImages} alt={images.tags} />
      </StyledModal>
    </Overlay>
  );
};
