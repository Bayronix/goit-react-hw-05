import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TrendingMovies from "./TrendingMovies/TrendingMovies";
import TrendingMoviesApi from "./TrendingMovies/TrendingMoviesApi";
import SearchForm from "./SearchMovie/SearchMovie";
import MovieDetails from "./MovieDetails/MovieDetails";
import axios from "axios";

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    TrendingMoviesApi().then((data) => {
      setMovies(data);
    });
  }, []);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = "3ad8d355e7df16ea15ed8d39f76c4341";
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

    axios
      .get(url)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setError("Failed to fetch movie details.");
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav>
        <NavLink to="/Home">Home</NavLink>
        <NavLink to="/Movies">Movies</NavLink>
      </nav>
      <Routes>
        <Route path="/Home" element={<TrendingMovies movies={movies} />} />
        <Route path="/Movies" element={<SearchForm />} />
        <Route path="/movie/:id" element={<MovieDetails movie={movie} />} />
      </Routes>
    </>
  );
};

export default App;
