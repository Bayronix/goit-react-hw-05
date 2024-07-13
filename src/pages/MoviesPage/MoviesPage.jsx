import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import Styles from "./MoviesPage.module.css";
const MoviesPage = ({ handleSearch, searchMovies }) => {
  return (
    <div>
      <Formik
        initialValues={{ text: "" }}
        onSubmit={(values, { setSubmitting }) => {
          handleSearch(values.text);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="text" />
            <button type="submit" disabled={isSubmitting}>
              Search
            </button>
          </Form>
        )}
      </Formik>

      <ul className={Styles.ul}>
        {searchMovies.map((movie) => (
          <li className={Styles.ul} key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

MoviesPage.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchMovies: PropTypes.array.isRequired,
};

export default MoviesPage;
