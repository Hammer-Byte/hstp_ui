import apiClient from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";

/**
 * Home Service
 * Handles all home page related API calls
 */
const homeService = {
  /**
   * Get all testimonials
   * @returns {Promise}
   */
  getTestimonials: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.TESTIMONIALS);
      return response;
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      throw error;
    }
  }
};

export default homeService;
