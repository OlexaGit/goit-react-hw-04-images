import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ onGallery }) => {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem onGallery={onGallery} />
    </ul>
  );
};

export default ImageGallery;
