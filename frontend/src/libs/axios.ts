import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    try {
      const state = useAuthStore.getState();
      const token = state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("✓ Token attached to request:", token.substring(0, 20) + "...");
      } else {
        console.log("⚠ No token available in store");
      }
    } catch (error) {
      console.error("Error accessing auth store:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
