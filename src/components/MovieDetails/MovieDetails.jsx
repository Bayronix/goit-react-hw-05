const MovieDetails = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const voteProcent = Math.round(movie.vote_average * 10);

  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={imageUrl} alt={movie.title} />
      <p>User Score: {voteProcent}%</p>
      <p>Overview: {movie.overview}</p>
      <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
    </div>
  );
};

export default MovieDetails;
//  Вивести звідси Api
