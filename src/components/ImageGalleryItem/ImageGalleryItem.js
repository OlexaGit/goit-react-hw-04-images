import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ onGallery }) => {
  const [activeImageId, setActiveImageId] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleBigImage = index => {
    setActiveImageId(index);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const activeImage = onGallery[activeImageId];
  return (
    <>
      {onGallery.map(({ id, webformatURL }, index) => (
        <li className={css.ImageGalleryItem} key={id}>
          <img
            onClick={() => handleBigImage(index)}
            className={css.image}
            src={webformatURL}
            alt=""
          />
        </li>
      ))}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={activeImage.largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  activeImageId: PropTypes.number.isRequired,
  showModal: PropTypes.bool.isRequired,
};
export default ImageGalleryItem;
