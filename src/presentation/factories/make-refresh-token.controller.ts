import { type FastifyInstance } from "fastify";

import { RefreshTokenController } from "../http/controllers/auth/refresh-token.controller";

import { makeRefreshTokenUseCase } from "../../infrastructure/factories/make-refresh-token.use-case";

export function makeRefreshTokenController(app: FastifyInstance) {
  const refreshTokenUseCase = makeRefreshTokenUseCase(app);
  return new RefreshTokenController(refreshTokenUseCase);
}
