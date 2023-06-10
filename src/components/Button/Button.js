import React from 'react';
import css from './Buton.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <div className={css.ButtonState}>
      <button onClick={() => onLoadMore()} className={css.Button} type="button">
        Load More
      </button>
    </div>
  );
};

export default Button;
