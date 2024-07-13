import { NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "../pages/HomePage/HomePage";
import {
  TrendingMoviesApi,
  SearchMoviesApi,
  MovieDetailsApi,
  MovieCreditsApi,
  MovieReviewsApi,
} from "../Api/Api";
// Pages
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
// Components
import MovieCast from "./MovieCast/MovieCast";
import MovieReviews from "./MovieReviews/MovieReviews";
// Styles
import Styles from "./App.module.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [credits, setCredits] = useState([]);
  const [reviews, setReviews] = useState([]);
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

  const handleMovieDetails = async (id) => {
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

  const handleCredits = async () => {
    try {
      const credit = await MovieCreditsApi();
      setCredits(credit);
      setError(null);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError("Failed to fetch movie details.");
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };
  const handleReviews = async () => {
    try {
      const review = await MovieReviewsApi();
      setReviews(review);
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
      <div className={Styles.background}>
        <nav className={Styles.nav}>
          <NavLink className={Styles.text} to="/">
            Home
          </NavLink>
          <NavLink className={Styles.text} to="/movies">
            Movies
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />
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
                handleMovieDetails={handleMovieDetails}
                movie={movie}
                error={error}
                loading={loading}
              />
            }
          >
            <Route
              handleCredits={handleCredits}
              credits={credits}
              path="cast"
              element={<MovieCast />}
            />
            <Route
              handleReview={handleReviews}
              reviews={reviews}
              path="reviews"
              element={<MovieReviews />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
