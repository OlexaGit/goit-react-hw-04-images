import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { getGallery } from './Api/JsonPixabayApi';
import css from './App.module.css';
import ErrorWrapper from './Page/ErrorWrapper';
import Info from './Info/Info';

export class App extends Component {
  state = {
    gallery: [],
    searchInput: '',
    isError: false,
    totalHits: 1,
    isLoaderVisible: false,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchInput !== this.state.searchInput ||
      this.state.page !== prevState.page
    ) {
      try {
        this.setState({ isLoaderVisible: true });
        const data = await getGallery(this.state.searchInput, this.state.page);
        const gallery = data.hits;

        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...gallery],
          totalHits: data.totalHits,
        }));
      } catch (error) {
        this.setState({ isError: true });
        console.error(error);
      } finally {
        this.setState({ isLoaderVisible: false });
      }
    }
  }

  handleFormSubmit = searchInput => {
    this.setState({
      searchInput,
      page: 1,
      gallery: [],
    });
  };

  LoadMoreGallery = () => {
    let nextPage = this.state.page;
    this.setState({ page: nextPage + 1 });
  };

  render() {
    const { isLoaderVisible, isError, gallery, totalHits, page } = this.state;
    const LoadMore = page < Math.ceil(totalHits / 12);

    return (
      <div className={css.App}>
        <Searchbar onSubmitSearchInput={this.handleFormSubmit} />
        {isLoaderVisible && <Loader />}

        <ErrorWrapper isError={isError}>
          <ImageGallery onGallery={gallery} />
          {LoadMore && <Button onLoadMore={this.LoadMoreGallery} />}
          {totalHits === 0 && <Info />}
        </ErrorWrapper>
      </div>
    );
  }
}
App.propTypes = {
  state: PropTypes.shape({
    gallery: PropTypes.arrayOf(PropTypes.string.isRequired),
    searchInput: PropTypes.string.isRequired,
    totalHits: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoaderVisible: PropTypes.bool.isRequired,
  }),
};
