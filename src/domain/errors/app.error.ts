/**
 * Base class for all application errors
 * Unifies domain and HTTP errors into a single, simple structure
 *
 * All custom errors should extend this class and provide:
 * - message: Human-readable error message
 * - status: HTTP status code
 * - code: Machine-readable error code
 * - details: Optional additional context
 * - expose: Whether to expose the message to clients (default: true)
 */
export class AppError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: unknown;
  public readonly expose: boolean;

  constructor(
    message: string,
    status: number,
    code: string,
    details?: unknown,
    expose: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details;
    this.expose = expose;
    Error.captureStackTrace(this, this.constructor);
  }
}
