import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth headers
api.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (userId) {
      config.headers["X-User-ID"] = userId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const getActivities = () => api.get("/activities");

export const addActivity = (activity) => api.post("/activities", activity);

export const getActivityDetail = (id) =>
  api.get(`/recommendations/activity/${id}`);

export default api;
