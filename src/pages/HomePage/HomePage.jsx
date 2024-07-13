import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Styles from "./HomePage.module.css";

const HomePage = ({ movies }) => (
  <>
    <h1 className={Styles.header}>Trending Today</h1>
    <ul className={Styles.ul}>
      {movies.map((movie) => (
        <li className={Styles.ul} key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  </>
);

HomePage.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HomePage;
