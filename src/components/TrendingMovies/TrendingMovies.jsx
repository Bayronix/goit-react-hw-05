import Api from "./Api";
import { useEffect, useState } from "react";

export default function TrendingMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Api().then((data) => {
      setMovies(data);
    });
  }, []);

  return (
    <>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
}
