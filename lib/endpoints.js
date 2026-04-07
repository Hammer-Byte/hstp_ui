export const ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh",
  GET_ME: "/auth/me",

  // Course
  COURSES: "/courses",
  COURSE_DETAIL: (id) => `/courses/${id}`,
  COURSE_CATEGORIES: "/categories",

  // User
  PROFILE: "/user/profile",
  MY_COURSES: "/user/my-courses",
};
