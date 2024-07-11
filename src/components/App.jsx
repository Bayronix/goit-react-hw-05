import { Link, NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import TrendingMovies from "./TrendingMovies/TrendingMovies";
import Api from "./TrendingMovies/Api";
import SearchForm from "./SearchMovie/SearchMovie";
import MovieDetails from "./MovieDetails/MovieDetails";

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Api().then((data) => {
      setMovies(data);
    });
  }, []);

  return (
    <>
      <nav>
        <NavLink to="/Home">Home</NavLink>
        <NavLink to="/Movies">Movies</NavLink>
      </nav>
      <Routes>
        <Route path="/Home" element={<TrendingMovies movies={movies} />} />
        <Route path="/Movies" element={<SearchForm />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default App;
