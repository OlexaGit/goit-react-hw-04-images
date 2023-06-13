import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { getGallery } from './Api/JsonPixabayApi';
import css from './App.module.css';
import ErrorWrapper from './Page/ErrorWrapper';
import Info from './Info/Info';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [totalHits, setTotalHits] = useState(1);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!searchInput) {
      return;
    }
    Api(searchInput, page);
  }, [searchInput, page]);

  const Api = async (searchInput, page) => {
    try {
      setIsLoaderVisible(true);
      const data = await getGallery(searchInput, page);
      const gallery = data.hits;
      setGallery(prevState => [...prevState, ...gallery]);
      setTotalHits(data.totalHits);
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsLoaderVisible(false);
    }
  };

  const handleFormSubmit = searchInput => {
    setSearchInput(searchInput);
    setPage(1);
    setGallery([]);
  };

  const LoadMore = page < Math.ceil(totalHits / 12);

  return (
    <div className={css.App}>
      <Searchbar onSubmitSearchInput={handleFormSubmit} />
      {isLoaderVisible && <Loader />}
      <ErrorWrapper isError={isError}>
        <ImageGallery onGallery={gallery} />
        {LoadMore && <Button onLoadMore={() => setPage(page => page + 1)} />}
        {totalHits === 0 && <Info />}
      </ErrorWrapper>
    </div>
  );
};

App.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string),
  searchInput: PropTypes.string,
  totalHits: PropTypes.number,
  page: PropTypes.number,
  isError: PropTypes.bool,
  isLoaderVisible: PropTypes.bool,
};
