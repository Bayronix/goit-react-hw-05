import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Styles from "./MovieDetailsPage.module.css";
import { MovieDetailsApi } from "../../Api/Api";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useRef } from "react";

const MovieDetailsPage = () => {
  const { movieid } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await MovieDetailsApi(movieid);
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

    fetchMovieDetails();
  }, [movieid]);

  if (loading) {
    return <div className={Styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={Styles.error}>{error}</div>;
  }

  if (!movie) {
    return <div className={Styles.noData}>No movie data available.</div>;
  }

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750"; // Placeholder image
  const votePercent = Math.round(movie.vote_average * 10);

  return (
    <div className={Styles.divContainer}>
      <Link to={backLinkRef.current}>Go back</Link>
      <h2 className={Styles.title}>{movie.title}</h2>
      <img className={Styles.img} src={imageUrl} alt={movie.title} />
      <div className={Styles.details}>
        <p className={Styles.score}>
          <span className={Styles.spanUser}>User Score:</span> {votePercent}%
        </p>
        <p className={Styles.overview}>
          <span className={Styles.spanOverview}>Overview:</span>{" "}
          {movie.overview}
        </p>
        <p className={Styles.genres}>
          <span className={Styles.spanGenres}>Genres:</span>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
      </div>
      <div className={Styles.linkContainer}>
        <p className={Styles.Additional}>Additional information</p>
        <ul>
          <li className={Styles.addContainer}>
            <NavLink to="cast" className={Styles.navLink}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={Styles.navLink}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
