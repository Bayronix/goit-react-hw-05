import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

const MovieDetailsPage = ({
  fetchAndSetMovieDetails,
  movie,
  error,
  loading,
}) => {
  const { id } = useParams();

  useEffect(() => {
    fetchAndSetMovieDetails(id);
  }, [id, fetchAndSetMovieDetails]);

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
    <div>
      <h2>{movie.title}</h2>
      <img src={imageUrl} alt={movie.title} />
      <p>User Score: {votePercent}%</p>
      <p>Overview: {movie.overview}</p>
      <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
    </div>
  );
};

MovieDetailsPage.propTypes = {
  fetchAndSetMovieDetails: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default MovieDetailsPage;
