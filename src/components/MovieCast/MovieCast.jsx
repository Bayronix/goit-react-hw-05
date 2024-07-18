import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MovieCreditsApi } from "../../Api/Api";
import style from "./MovieCast.module.css";
const MovieCast = () => {
  const { id } = useParams();
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCast, setShowCast] = useState(false);

  useEffect(() => {
    const fetchCredits = async () => {
      setLoading(true);
      try {
        const credit = await MovieCreditsApi(id);
        setCredits(credit.cast);
        setError(null);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
        setError("Failed to fetch movie credits.");
      } finally {
        setLoading(false);
      }
    };

    if (showCast) {
      fetchCredits();
    }
  }, [showCast, id]);

  const displayCredits = credits.slice(0, 5);

  return (
    <div>
      <h2 className={style.additionalInfo}>Additional Information</h2>
      <ul>
        <li>
          <Link
            to="#"
            onClick={() => setShowCast(!showCast)}
            className={style.toggleLink}
          >
            {showCast ? "Hide Cast" : "Show Cast"}
          </Link>
        </li>
      </ul>
      {loading && <div className={style.loading}>Loading...</div>}
      {error && <div className={style.error}>{error}</div>}
      {showCast && !loading && !error && (
        <ul className={style.castList}>
          {displayCredits.map((credit) => (
            <li key={credit.id} className={style.castItem}>
              <img
                src={
                  credit.profile_path
                    ? `https://image.tmdb.org/t/p/w200${credit.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={credit.name}
                width="200"
                className={style.castImage}
              />
              <h3 className={style.castName}>{credit.name}</h3>
              <p className={style.castCharacter}>
                Character: {credit.character}
              </p>
            </li>
          ))}
        </ul>
      )}

      <Outlet />
    </div>
  );
};

export default MovieCast;
