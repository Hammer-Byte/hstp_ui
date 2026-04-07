import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes image URLs, specifically handling broken Google Drive view links
 * @param {string} url 
 * @returns {string} Direct image source URL
 */
export function getImageUrl(url) {
  if (!url) return "/hero-sec-image.png";
  
  // Handle Google Drive links
  if (url.includes("drive.google.com")) {
    const fileId = url.split("/d/")[1]?.split("/")[0] || url.split("id=")[1]?.split("&")[0];
    if (fileId) {
      // Direct image viewing link (much more robust)
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }
  
  return url;
}
