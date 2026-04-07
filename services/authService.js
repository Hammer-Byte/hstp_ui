import apiClient from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";

/**
 * Authentication Service (Professional implementation)
 * Separating API logic from component lifecycle
 */

const authService = {
  /**
   * User Login
   * @param {Object} credentials - { email, password }
   * @returns {Promise} - { user, token }
   */
  login: async (credentials) => {
    try {
      const response = await apiClient.post(ENDPOINTS.LOGIN, credentials);
      return response; // response interceptor already extracted .data
    } catch (error) {
       throw error;
    }
  },

  /**
   * User Registration
   * @param {Object} userData - { name, email, password, etc. }
   * @returns {Promise}
   */
  register: async (userData) => {
    try {
      const response = await apiClient.post(ENDPOINTS.REGISTER, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get Current Authenticated User (Profile sync)
   * @returns {Promise} 
   */
  getMe: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_ME);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout from server
   */
  logout: async () => {
    try {
      await apiClient.post(ENDPOINTS.LOGOUT);
    } catch (error) {
      // Still log them out locally even if API fails
      console.error("Server logout failed", error);
    }
  }
};

export default authService;
