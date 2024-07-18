import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Styles from "./HomePage.module.css";
import { TrendingMoviesApi } from "../../Api/Api";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className={Styles.header}>Trending Today</h1>
      <ul className={Styles.ul}>
        {movies.map((movie) => (
          <li className={Styles.li} key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
