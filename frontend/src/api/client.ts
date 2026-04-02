import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:8000" : "https://buyer-portal-aasignment.vercel.app/_/backend",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;