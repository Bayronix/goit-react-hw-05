import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Styles from "./MovieDetailsPage.module.css";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import { MovieDetailsApi } from "../../Api/Api";
import { Link } from "react-router-dom";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
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

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>No movie data available.</div>;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const votePercent = Math.round(movie.vote_average * 10);

  return (
    <div className={Styles.divContainer}>
      <Link to={`/`}>Go back</Link>
      <h2 className={Styles.title}>{movie.title}</h2>
      <img className={Styles.img} src={imageUrl} alt={movie.title} />
      <div className={Styles.div}>
        <p className={Styles.score}>
          <span className={Styles.spanUser}>User Score:</span>
          {votePercent}%
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
      <>
        <MovieCast />
        <MovieReviews />
      </>
    </div>
  );
};

export default MovieDetailsPage;
