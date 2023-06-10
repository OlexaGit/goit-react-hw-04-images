import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    const { onGallery } = this.props;
    return (
      <ul className={css.ImageGallery}>
        <ImageGalleryItem onGallery={onGallery} />
      </ul>
    );
  }
}

export default ImageGallery;
