import axios from "axios";

const apiKey = "3ad8d355e7df16ea15ed8d39f76c4341";
const link = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${apiKey}`;

const getUrl = () => {
  return axios
    .get(link)
    .then((response) => response.data.results)
    .catch((error) => {
      console.log("error", error);
      return [];
    });
};

export default getUrl;
