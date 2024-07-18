import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import Styles from "./MoviesPage.module.css";
import { useState } from "react";
import { SearchMoviesApi } from "../../Api/Api";

const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const searchResults = await SearchMoviesApi(query);
      setSearchMovies(searchResults.results);
      setError(null);
    } catch (error) {
      console.error("Error searching movies:", error);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  };

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

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <ul className={Styles.ul}>
          {searchMovies.map((movie) => (
            <li className={Styles.li} key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
