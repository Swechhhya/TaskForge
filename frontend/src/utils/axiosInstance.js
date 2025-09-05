import axios from "axios";
import { BASE_URL } from "./apiPaths";
import { handleApiError, logError } from "./errorHandler";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = handleApiError(error);
    logError(error, 'API Request');
    
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        toast.error("Server error. Please try again later.");
      } else if (error.response.status === 429) {
        toast.error("Too many requests. Please slow down.");
      }
    } else if (error.code === "ECONNABORTED") {
      toast.error("Request timeout. Please try again.");
    } else if (!navigator.onLine) {
      toast.error("No internet connection. Please check your network.");
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
