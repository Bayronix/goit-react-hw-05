import { NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "../pages/HomePage";
import {
  TrendingMoviesApi,
  SearchMoviesApi,
  MovieDetailsApi,
} from "../Api/Api";
import MoviesPage from "../pages/MoviesPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import MovieCast from "./MovieCast/MovieCast";
import MovieReviews from "./MovieReviews/MovieReviews";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const moviesData = await TrendingMoviesApi();
        setMovies(moviesData);
        setError(null);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError("Failed to fetch trending movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleSearch = async (query) => {
    try {
      const searchResults = await SearchMoviesApi(query);
      setSearchMovies(searchResults);
      setError(null);
    } catch (error) {
      console.error("Error searching movies:", error);
      setError("Failed to search movies.");
    }
  };

  const fetchAndSetMovieDetails = async (id) => {
    try {
      const movieData = await MovieDetailsApi(id);
      setMovie(movieData);
      setError(null);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError("Failed to fetch movie details.");
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
      <Routes>
        <Route path="/home" element={<HomePage movies={movies} />} />
        <Route
          path="/movies"
          element={
            <MoviesPage
              handleSearch={handleSearch}
              searchMovies={searchMovies}
            />
          }
        />
        <Route
          path="/movies/:id"
          element={
            <MovieDetailsPage
              fetchAndSetMovieDetails={fetchAndSetMovieDetails}
              movie={movie}
              error={error}
              loading={loading}
            />
          }
        >
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
