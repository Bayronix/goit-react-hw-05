import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MovieReviewsApi } from "../../Api/Api";
import Styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieid } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await MovieReviewsApi(movieid);
        if (response && response.results) {
          setReviews(response.results);
          setError(null);
        } else {
          setError("Failed to fetch movie reviews.");
        }
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
        setError("Failed to fetch movie reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieid]);

  const displayReviews = reviews.slice(0, 1);

  return (
    <div className={Styles.container}>
      {loading && <div className={Styles.loading}>Loading...</div>}
      {error && <div className={Styles.error}>{error}</div>}
      {!loading && !error && reviews.length > 0 ? (
        <ul>
          {displayReviews.map((review) => (
            <li key={review.id} className={Styles.review}>
              <h3 className={Styles.h3}>{review.author}</h3>
              <p className={Styles.p}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading &&
        !error && <p className={Styles.noReviews}>No reviews available.</p>
      )}
    </div>
  );
};

export default MovieReviews;
