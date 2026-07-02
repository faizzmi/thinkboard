import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001" 
  : "";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Cache-Control": "no-cache",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;