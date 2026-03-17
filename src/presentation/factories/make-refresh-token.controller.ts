import { RefreshTokenController } from "../http/controllers/auth/refresh-token.controller";

import { makeRefreshTokenUseCase } from "../../infrastructure/factories/make-refresh-token.use-case";

export function makeRefreshTokenController() {
  const refreshTokenUseCase = makeRefreshTokenUseCase();
  return new RefreshTokenController(refreshTokenUseCase);
}
