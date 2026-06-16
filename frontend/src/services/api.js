import axios from "axios";

const API = axios.create({
  baseURL: "https://authentication-project-f0ac.onrender.com",
   withCredentials: true
});

export default API;
