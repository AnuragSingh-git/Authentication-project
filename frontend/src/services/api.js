import axios from "axios";

const API = axios.create({
  baseURL: "https://authentication-project-production.up.railway.app",
   withCredentials: true
});

export default API;
