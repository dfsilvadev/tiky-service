import { ZodError } from "zod";

import { AppError } from "../../domain/errors";

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_ERROR
} from "../constants/error.constants";

export interface IResponse {
  readonly statusCode: number;
  readonly details: Record<string, any> | null;
}

export function toHttpResponse(error: unknown): IResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: HTTP_STATUS_ERROR.BAD_REQUEST,
      details: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: ERROR_MESSAGES.VALIDATION_ERROR,
        issues: error.issues
      }
    };
  }

  if (error instanceof AppError) {
    return {
      statusCode: HTTP_STATUS_ERROR.BAD_REQUEST,
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
    statusCode: HTTP_STATUS_ERROR.INTERNAL_SERVER_ERROR,
    details: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    }
  };
}
