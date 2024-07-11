import axios from "axios";

const apiKey = "3ad8d355e7df16ea15ed8d39f76c4341";

const TrendingMoviesApi = () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day";

  return axios
    .get(url, {
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.error("Error fetching trending movies:", error);
      return [];
    });
};

export default TrendingMoviesApi;
