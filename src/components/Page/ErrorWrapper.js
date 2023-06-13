import css from './ErrorWrapper.module.css';

const ErrorWrapper = ({ isError, children }) => {
  if (isError) {
    return <h1 className={css.info}>Ooops!!! Something went wrong!</h1>;
  }
  return <>{children}</>;
};
export default ErrorWrapper;
