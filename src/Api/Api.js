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
    .then((response) => response.data.results)
    .catch((error) => {
      console.error("Error fetching trending movies:", error);
      return [];
    });
};
// Home page

const SearchMoviesApi = (query) => {
  const url = "https://api.themoviedb.org/3/search/movie";

  return axios
    .get(url, {
      params: {
        api_key: apiKey,
        query: query,
      },
    })
    .then((response) => response.data.results)
    .catch((error) => {
      console.error("Error searching movies:", error);
      return [];
    });
};
// handleSearch

const MovieDetailsApi = (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  return axios
    .get(url, {
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching movie details:", error);
      return null;
    });
};

// MovieDetails

export { TrendingMoviesApi, MovieDetailsApi, SearchMoviesApi };
