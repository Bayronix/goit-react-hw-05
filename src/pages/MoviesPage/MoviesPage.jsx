import { Formik, Form, Field } from "formik";
import { useSearchParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { SearchMoviesApi } from "../../Api/Api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
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

    fetchMovies();
  }, [query]);

  const handleSearch = (query) => {
    setSearchParams({ query });
  };

  return (
    <div>
      <Formik
        initialValues={{ text: query }}
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
      {!loading && !error && <MovieList movies={searchMovies} />}
    </div>
  );
};

export default MoviesPage;
