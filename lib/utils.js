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
  // Handle falsy values, non-strings, or empty/whitespace-only strings
  if (!url || typeof url !== "string" || url.trim() === "" || url === "null" || url === "undefined") {
    return "/hero-sec-image.png";
  }

  const trimmedUrl = url.trim();
  
  // Handle Google Drive links
  if (trimmedUrl.includes("drive.google.com")) {
    const fileId = trimmedUrl.split("/d/")[1]?.split("/")[0] || trimmedUrl.split("id=")[1]?.split("&")[0];
    if (fileId) {
      // Direct image viewing link
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  // VALIDATION: Catch junk text like "kbdkhvb"
  // A valid image source should either:
  // 1. Start with "/" (local path)
  // 2. Start with "http" (remote URL)
  // 3. Start with "data:" (base64)
  // 4. Contain a "." (file extension or domain)
  const isLikelyUrlOrPath = 
    trimmedUrl.startsWith("/") || 
    trimmedUrl.startsWith("http") || 
    trimmedUrl.startsWith("data:") || 
    trimmedUrl.includes(".");

  if (!isLikelyUrlOrPath) {
    return "/hero-sec-image.png";
  }
  
  return trimmedUrl;
}
