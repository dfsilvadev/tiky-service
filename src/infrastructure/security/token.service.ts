import { type FastifyInstance } from "fastify";

import { AppError } from "../../domain/errors";

import {
  type ITokenService,
  type ITokenSignInput
} from "../../domain/services/token.service";

export class FastifyTokenService implements ITokenService {
  constructor(private readonly _app: FastifyInstance) {}

  sign({ payload, options }: ITokenSignInput): string {
    try {
      const token = this._app.jwt.sign(payload, options);
      return token;
    } catch {
      throw new AppError(
        "Error signing token",
        500,
        "TOKEN_SIGNING_ERROR",
        undefined,
        false
      );
    }
  }

  verify(_token: string): Record<string, any> {
    try {
      return this._app.jwt.verify(_token);
    } catch {
      throw new AppError(
        "Invalid token",
        401,
        "TOKEN_VERIFICATION_ERROR",
        undefined,
        false
      );
    }
  }
}
