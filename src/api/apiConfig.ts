import axios from "axios";
import { handleResponseError } from "./responseErrorHandler";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  timeout: 10_000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token =
      sessionStorage.getItem("auth_token") ||
      localStorage.getItem("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  handleResponseError,
);

export default apiClient;
