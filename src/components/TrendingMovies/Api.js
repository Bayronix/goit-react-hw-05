import axios from "axios";

const apiKey = "3ad8d355e7df16ea15ed8d39f76c4341";
const link = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;

const getUrl = () => {
  return axios
    .get(link, {
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => {
      console.log(response.data.results);
      return response.data.results;
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
      return [];
    });
};

export default getUrl;
