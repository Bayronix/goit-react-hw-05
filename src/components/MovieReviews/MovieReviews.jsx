import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MovieReviewsApi } from "../../Api/Api";
import Styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await MovieReviewsApi(id);
        console.log("API Response:", response);
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

    if (showReview) {
      fetchReviews();
    }
  }, [showReview, id]);

  const displayReviews = reviews.slice(0, 1);

  return (
    <div className={Styles.container}>
      <Link
        to={`/movies/${id}/cast`}
        onClick={(e) => {
          e.preventDefault();
          setShowReview(!showReview);
        }}
        className={Styles.link}
      >
        {showReview ? "Hide Review" : "Show Review"}
      </Link>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {showReview && !loading && !error && (
        <ul>
          {displayReviews.map((review) => (
            <li key={review.id}>
              <h3 className={Styles.h3}>{review.author}</h3>
              <p className={Styles.p}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {showReview && !loading && !error && reviews.length === 0 && (
        <p className={Styles.Av}>No reviews available.</p>
      )}
    </div>
  );
};

export default MovieReviews;
