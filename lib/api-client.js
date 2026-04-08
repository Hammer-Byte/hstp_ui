import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

// Use relative /api URL on the client to exploit the Next.js proxy (bypassing CORS)
// Use the full URL on the server (SSR / prefetching) to avoid resolution issues
const API_BASE_URL = typeof window !== "undefined" 
  ? "/api" 
  : (process.env.NEXT_PUBLIC_API_URL || "https://dev-hstp.hammerbyte.co.in/api");

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// REQUEST INTERCEPTOR: Inject Auth Token
apiClient.interceptors.request.use(
  (config) => {
    // Access zustand state outside React context
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR: Generic Error Handling & 401 Handling
apiClient.interceptors.response.use(
  (response) => {
    // Directly return response.data to simplify usage in services
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle session expiration (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Here you would normally call refreshToken logic from ENDPOINTS.REFRESH_TOKEN
        // If it fails, clear auth state
        useAuthStore.getState().logout();
        window.location.href = "/login";
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Professional error structure: return message as string for Toast UI
    const customError = {
      message: error.response?.data?.message || "Something went wrong. Please try again.",
      status: error.response?.status,
      data: error.response?.data
    };

    return Promise.reject(customError);
  }
);

export default apiClient;
