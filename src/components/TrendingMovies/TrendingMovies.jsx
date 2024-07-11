import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TrendingMovies = ({ movies }) => (
  <>
    <h1>Trending Today</h1>
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  </>
);

TrendingMovies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TrendingMovies;
