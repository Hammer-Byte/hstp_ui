import apiClient from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";

/**
 * Course Service
 * Handles all course related API calls
 */
const courseService = {
  /**
   * Get all courses
   * @returns {Promise} 
   */
  getCourses: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.COURSES);
      return response;
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      throw error;
    }
  },

  /**
   * Get course by ID
   * @param {string} id 
   * @returns {Promise}
   */
  getCourseDetail: async (id) => {
    try {
      const response = await apiClient.get(ENDPOINTS.COURSE_DETAIL(id));
      return response;
    } catch (error) {
      console.error(`Failed to fetch course ${id}:`, error);
      throw error;
    }
  }
};

export default courseService;
