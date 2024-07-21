// MovieList.js
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  return (
    <ul className={Styles.ul}>
      {movies.map((movie) => (
        <li className={Styles.li} key={movie.id}>
          <Link to={`/movies/${movie.id}`} className={Styles.link}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieList;
