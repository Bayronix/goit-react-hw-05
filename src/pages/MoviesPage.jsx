import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

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

      <ul>
        {searchMovies.map((searchMovie) => (
          <li key={searchMovie.id}>
            <Link to={`/movies/${searchMovie.id}`}>{searchMovie.title}</Link>
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
