import axios from "axios";

const apiKey = "3ad8d355e7df16ea15ed8d39f76c4341";

const MovieDetailsApi = (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  return axios
    .get(url, {
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
      return null;
    });
};

export default MovieDetailsApi;
