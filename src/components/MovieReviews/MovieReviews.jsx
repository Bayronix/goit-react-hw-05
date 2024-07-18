import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MovieReviewsApi } from "../../Api/Api";

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

  const displayReviews = reviews.slice(0, 2);

  return (
    <div>
      <Link to="#" onClick={() => setShowReview(!showReview)}>
        {showReview ? "Hide Reviews" : "Show Reviews"}
      </Link>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {showReview && !loading && !error && (
        <ul>
          {displayReviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {showReview && !loading && !error && reviews.length === 0 && (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default MovieReviews;
