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
  },

  /**
   * Get all courses for a specific category
   * @param {string|number} id - The category ID
   * @returns {Promise}
   */
  getCategoryCourses: async (id) => {
    try {
      const data = await apiClient.get(`/category/${id}/courses`);
      return data;
    } catch (error) {
      console.error(`Failed to fetch courses for category ${id}:`, error);
      throw error;
    }
  }
};

export default categoryService;
