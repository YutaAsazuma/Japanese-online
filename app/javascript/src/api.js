import axios from 'axios';

const API = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true
});

const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
if (csrfToken) {
  API.defaults.headers['X-CSRF-Token'] = csrfToken;
}

export default API;
