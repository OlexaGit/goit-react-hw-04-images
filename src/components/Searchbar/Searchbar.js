import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import Notiflix from 'notiflix';
import css from './SearchForm.module.css';

const Searchbar = ({ onSubmitSearchInput }) => {
  const [searchInput, setSearchInput] = useState('');

  const handlesearchChange = evt => {
    setSearchInput(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchInput.trim() === '') {
      Notiflix.Notify.warning('😪 Search images and photos.');
      return;
    }
    onSubmitSearchInput(searchInput);
    setSearchInput('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>
            <ImSearch />
          </span>
        </button>
        <input
          className={css.input}
          type="text"
          name="searchInput"
          value={searchInput}
          onChange={handlesearchChange}
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  searchInput: PropTypes.string,
};
export default Searchbar;
