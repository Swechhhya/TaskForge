export const BASE_URL = "http://localhost:8000/"

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Register a new user (Admin or Member)
    LOGIN: "/api/auth/login", // Authenticate user & return JWT token
    GET_PROFILE: "/api/auth/profile", // Get logged-in user details
  },
  USERS: {
    GET_ALL_USERS: "/api/users", // Get all users (Admin only)
    GET_USER_BY_ID: "/api/users/${userId}", // Get user by ID
    CREATE_USER: "/api/users", // Create a new user (Admin only)
    GET_USER_DETAILS: "/api/users/${userId}", // Get user details
    DELETE_USER: "/api/users/${userId}", // Delete a user
  },
  TASKS: {
    GET_DASHBOARD_DATA: "/api/tasks/dashboard-data", // Get Dashboard data
    GET_USER_DASHBOARD_DATA: "/api/tasks/dashboard-data/${userId}", // Get User Dashboard data
    GET_ALL_TASKS: "/api/tasks", // Get all tasks (Admin only)
    GET_TASK_BY_ID: "/api/tasks/${taskId}", // Get task by ID
    CREATE_TASK: "/api/tasks", // Create a new task
    GET_TASK_DETAILS: "/api/tasks/${taskId}", // Get task details
    DELETE_TASK: "/api/tasks/${taskId}", // Delete a task
    UPDATE_TASK_STATUS: "/api/tasks/${taskId}/status", // Update task status
    UPDATE_TODO_CHECKLIST: "/api/tasks/${taskId}/todo", // Update todo checklist
  },
  REPORTS: {
    EXPORT_TASKS: "/api/reports/export/tasks", // Download all tasks as an Excel
  },

  IMAGE: {
    UPLOAD_IMAGE: "api/auth/upload-image", // Upload an image
  },
};