/**
 * HTTP Status Codes
 * Shared constants that can be used across all layers
 */
export const HTTP_STATUS_ERROR = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  GONE: 410,
  INTERNAL_SERVER_ERROR: 500
} as const;

/**
 * Error Codes
 * Shared constants that can be used across all layers
 */

export const ERROR_CODES = {
  // Validation (400)
  VALIDATION_ERROR: "VALIDATION_ERROR",

  // Authentication (401) - Not authenticated
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_TOKEN_FORMAT: "INVALID_TOKEN_FORMAT",
  INVALID_TOKEN_PAYLOAD: "INVALID_TOKEN_PAYLOAD",
  UNAUTHORIZED: "UNAUTHORIZED",

  // Authorization (403) - Authenticated but not authorized
  FORBIDDEN: "FORBIDDEN",

  // Not Found (404) - Resource does not exist
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",

  // Conflicts (409)
  ACCOUNT_ALREADY_EXISTS: "ACCOUNT_ALREADY_EXISTS",
  ACCOUNT_NOT_FOUND: "ACCOUNT_NOT_FOUND",

  // Generic (500)
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR"
} as const;

/**
 * Helper type to ensure type-safety when using error codes
 */
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/**
 * Error Messages
 * Shared constants that can be used across all layers
 */
export const ERROR_MESSAGES = {
  // Validation (400)
  VALIDATION_ERROR:
    "We couldn't process your request due to invalid data. Please check your information and try again",

  // Authentication (401) - Not authenticated
  INVALID_CREDENTIALS:
    "The email or password you entered is incorrect. Please try again",
  AUTHENTICATION_REQUIRED: "Please log in to access this resource",
  AUTHENTICATION_TOKEN_REQUIRED:
    "Authentication token is missing. Please log in again",
  UNAUTHORIZED:
    "Access denied. Please ensure you're logged in with the correct user",

  // Token Errors (401)
  INVALID_TOKEN: "Your session has expired or is invalid. Please log in again",
  INVALID_TOKEN_FORMAT: "Authentication format is invalid. Please log in again",
  INVALID_TOKEN_PAYLOAD:
    "Your session information is incomplete. Please log in again",
  INVALID_TOKEN_ROLE:
    "Your user role is invalid. Please contact support for assistance",

  // Authorization (403) - Authenticated but not authorized
  FORBIDDEN:
    "You don't have permission to access this resource. Please contact your administrator",
  ACCOUNT_ALREADY_EXISTS:
    "An account with this email address already exists. Please use a different email or try logging in",
  ACCOUNT_NOT_FOUND: "The specified account does not exist",

  // Not Found (404) - Resource does not exist
  RESOURCE_NOT_FOUND: "We couldn't find the resource you were looking for",

  // Conflicts (409)
  USER_EXISTS:
    "A user with this email address already exists. Please use a different email or try logging in",

  // Generic (500)
  INTERNAL_SERVER_ERROR:
    "Something went wrong on our end. Please try again later or contact support if the problem persists"
} as const;

/**
 * Helper type to ensure type-safety when using error messages
 */
export type ErrorMessage = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
