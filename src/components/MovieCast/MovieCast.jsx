import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MovieCreditsApi } from "../../Api/Api";
import style from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieid } = useParams();
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      setLoading(true);
      try {
        const credit = await MovieCreditsApi(movieid);
        setCredits(credit.cast);
        setError(null);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
        setError("Failed to fetch movie credits.");
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [movieid]);

  const displayCredits = credits.slice(0, 5);

  return (
    <div>
      {loading && <div className={style.loading}>Loading...</div>}
      {error && <div className={style.error}>{error}</div>}
      {!loading && !error && (
        <ul className={style.castList}>
          {displayCredits.length > 0 ? (
            displayCredits.map((credit) => (
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
            ))
          ) : (
            <p>No cast information available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
