import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWQ4ZDM1NWU3ZGYxNmVhMTVlZDhkMzlmNzZjNDM0MSIsIm5iZiI6MTcyMTEwODMwOS42NTA2MjgsInN1YiI6IjY2OGQ1YjdjNTM4NmJhYzA3MjQyMjZjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JYZ1qH8ZGTyPczKtAQbt5x900Ud-xfdO1aoBsqcig_k";
axios.defaults.headers.common["accept"] = "application/json";

export const TrendingMoviesApi = async (page = 1) => {
  const response = await axios.get("/trending/movie/day?language=en-US", {
    params: { page },
  });

  return response.data;
};

export const MovieDetailsApi = async (id) => {
  const response = await axios.get(`/movie/${id}?language=en-US`);
  return response.data;
};

export const MovieCreditsApi = async (id) => {
  const response = await axios.get(`/movie/${id}/credits`);

  return response.data;
};

export const MovieReviewsApi = async (id) => {
  const response = await axios.get(`/movie/${id}/reviews`);

  return response.data;
};

export const SearchMoviesApi = async (query, page = 1) => {
  const response = await axios.get(`/search/movie`, {
    params: { query, page },
  });

  return response.data;
};
