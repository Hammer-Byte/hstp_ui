import apiClient from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";

/**
 * Category Service
 * Handles all category related API calls
 */
const categoryService = {
  /**
   * Get all course categories
   * @returns {Promise} 
   */
  getCategories: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.COURSE_CATEGORIES);
      return response; // response interceptor already returns .data
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  }
};

export default categoryService;
