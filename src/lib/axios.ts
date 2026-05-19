import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Public auth endpoints that don't need token
const publicEndpoints = [
  "/auth/login",
  "/auth/forgot-password-request",
  "/auth/validate-otp",
  "/auth/verify-login-otp",
  "/auth/validate-reset-password-otp",
  "/auth/confirm-reset-password",
  "/users/register",
  "/users/verify-email",
];

// Request interceptor - only attach token for non-public endpoints
api.interceptors.request.use(
  (config) => {
    const requestUrl = config.url || "";
    const isPublicEndpoint = publicEndpoints.some((ep) => requestUrl.includes(ep));

    if (!isPublicEndpoint) {
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - don't redirect on 401 for public endpoints
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || "";
    const isPublicEndpoint = publicEndpoints.some((ep) => requestUrl.includes(ep));

    if (error.response?.status === 401 && !isPublicEndpoint) {
      if (typeof window !== "undefined") {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        localStorage.removeItem("user-storage");
        window.location.href = "/login";
      }
    }

    // Normalize error responses that use { type, title, status } format
    // into the expected { message } format so consumers can read error.response.data.message
    const data = error.response?.data;
    if (data && data.title && !data.message) {
      error.response.data.message = data.title;
    }

    return Promise.reject(error);
  }
);

export default api;
