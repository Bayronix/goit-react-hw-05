import { useState, useEffect } from "react";
import Styles from "./HomePage.module.css";
import { TrendingMoviesApi } from "../../Api/Api";
import { MdLocalMovies } from "react-icons/md";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const moviesData = await TrendingMoviesApi();
        setMovies(moviesData.results);
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

  if (loading) {
    return <div className={Styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={Styles.error}>{error}</div>;
  }

  return (
    <div className={Styles.container}>
      <h1 className={Styles.header}>
        <MdLocalMovies className={Styles.icon} />
        Trending Today
      </h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
