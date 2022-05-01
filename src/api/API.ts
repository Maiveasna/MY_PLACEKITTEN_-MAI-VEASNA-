import axios from "axios";

// This is the base URL for the API
// You can change this to point to your own server

const API = axios.create({
  baseURL:"https://api.thecatapi.com/"
});

export default API;