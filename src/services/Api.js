import axios from 'axios';

// const apiURL = "http://192.168.0.104:3333";
const apiURL = 'https://lu-teperino-arq-developer.herokuapp.com';

// comunicação com backend
const api = axios.create({
  // baseURL : "https://lu-teperino-arq-backend.herokuapp.com"
  // baseURL : "http://192.168.0.106:3333"
  baseURL: apiURL
  // baseURL: "https://lu-teperino-arq-developer.herokuapp.com"
});

export { apiURL };

export default api;
