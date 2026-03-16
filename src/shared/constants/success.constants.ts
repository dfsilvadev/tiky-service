/**
 * HTTP Success Status Codes
 * Shared constants that can be used across all layers
 */
export const HTTP_STATUS_SUCCESS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204
} as const;

/**
 * Success Codes
 * Shared constants that can be used across all layers
 */
export const SUCCESS_CODES = {
  // Validation / Confirmation (200)
  ACCOUNT_VERIFIED: "ACCOUNT_VERIFIED",

  // Authentication (200)
  AUTHENTICATED: "AUTHENTICATED",
  TOKEN_REFRESHED: "TOKEN_REFRESHED",
  LOGGED_OUT: "LOGGED_OUT",

  // Creation (201)
  ACCOUNT_CREATED: "ACCOUNT_CREATED",
  RESOURCE_CREATED: "RESOURCE_CREATED",

  // Retrieval (200)
  RESOURCE_RETRIEVED: "RESOURCE_RETRIEVED",
  RESOURCES_RETRIEVED: "RESOURCES_RETRIEVED",

  // Updates (200)
  RESOURCE_UPDATED: "RESOURCE_UPDATED",

  // Deletions (200 / 204)
  RESOURCE_DELETED: "RESOURCE_DELETED",

  // Generic Success
  OPERATION_SUCCESS: "OPERATION_SUCCESS"
} as const;

/**
 * Helper type to ensure type-safety when using success codes
 */
export type SuccessCode = (typeof SUCCESS_CODES)[keyof typeof SUCCESS_CODES];

/**
 * Success Messages
 * Shared constants that can be used across all layers
 */
export const SUCCESS_MESSAGES = {
  // Validation / Confirmation (200)
  ACCOUNT_VERIFIED:
    "Your email has been verified successfully. Thank you for confirming your account",

  // Authentication (200)
  AUTHENTICATED: "You have been authenticated successfully. Welcome back",
  TOKEN_REFRESHED: "Your session has been refreshed successfully",
  LOGGED_OUT: "You have been logged out successfully",

  // Creation (201)
  ACCOUNT_CREATED:
    "Your account has been created successfully. You can now sign in using your credentials",
  RESOURCE_CREATED: "The resource has been created successfully",

  // Retrieval (200)
  RESOURCE_RETRIEVED:
    "The requested information has been retrieved successfully",
  RESOURCES_RETRIEVED:
    "The requested resources have been retrieved successfully",

  // Updates (200)
  RESOURCE_UPDATED: "The information has been updated successfully",

  // Deletions (200 / 204)
  RESOURCE_DELETED: "The resource has been deleted successfully",

  // Generic Success
  OPERATION_SUCCESS: "Your request has been processed successfully"
} as const;

/**
 * Helper type to ensure type-safety when using success messages
 */
export type SuccessMessage =
  (typeof SUCCESS_MESSAGES)[keyof typeof SUCCESS_MESSAGES];
