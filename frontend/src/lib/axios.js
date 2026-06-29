import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001" 
  : "/api";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Cache-Control": "no-cache",
    },
});

export default api;