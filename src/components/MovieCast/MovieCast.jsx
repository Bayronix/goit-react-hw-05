import { NavLink } from "react-router-dom";

const MovieCast = () => {
  return (
    <div>
      <h3>Additional Information</h3>
      <NavLink to="cast">Cast</NavLink>
      <ul>
        {/* {credits.cast &&
          credits.cast.map((castMember) => (
            <li key={castMember.id}>{castMember.name}</li>
          ))} */}
      </ul>
    </div>
  );
};

export default MovieCast;
