import axios from 'axios';

const API = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true
});


export default API;
