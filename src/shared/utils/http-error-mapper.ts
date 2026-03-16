import { ZodError } from "zod";

import { AppError } from "../../domain/errors";

import { ERROR_CODES, ERROR_MESSAGES } from "../constants/error.constants";

export interface IResponse {
  readonly statusCode: string;
  readonly details: Record<string, any> | null;
}

export function toHttpResponse(error: unknown): IResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: ERROR_CODES.VALIDATION_ERROR,
      details: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: ERROR_MESSAGES.VALIDATION_ERROR,
        issues: error.issues
      }
    };
  }

  if (error instanceof AppError) {
    return {
      statusCode: ERROR_CODES.VALIDATION_ERROR,
      details: {
        code: error.code,
        message: error.expose
          ? error.message
          : ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        details: error.details ?? null
      }
    };
  }

  return {
    statusCode: ERROR_CODES.INTERNAL_SERVER_ERROR,
    details: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    }
  };
}
