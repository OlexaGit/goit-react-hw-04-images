import React, { Component } from 'react';
import css from './ErrorWrapper.module.css';

class ErrorWrapper extends Component {
  render() {
    const { isError, children } = this.props;
    if (isError) {
      return <h1 className={css.info}>Ooops!!! Something went wrong!</h1>;
    }
    return <>{children}</>;
  }
}
export default ErrorWrapper;
