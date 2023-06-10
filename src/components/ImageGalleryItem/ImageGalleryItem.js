import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    activeImageId: 0,
    showModal: false,
  };

  handleBigImage = index => {
    this.setState({ activeImageId: index });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { onGallery } = this.props;
    const { activeImageId, showModal } = this.state;
    const activeImage = onGallery[activeImageId];
    return (
      <>
        {onGallery.map(({ id, webformatURL }, index) => (
          <li className={css.ImageGalleryItem} key={id}>
            <img
              onClick={() => this.handleBigImage(index)}
              className={css.image}
              src={webformatURL}
              alt=""
            />
          </li>
        ))}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={activeImage.largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
ImageGalleryItem.propTypes = {
  state: PropTypes.shape({
    activeImageId: PropTypes.number.isRequired,
    showModal: PropTypes.bool.isRequired,
  }),
};
export default ImageGalleryItem;
