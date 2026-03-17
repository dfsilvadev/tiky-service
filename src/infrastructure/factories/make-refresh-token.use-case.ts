import { RefreshTokenUseCase } from "../../application/use-cases/auth/refresh-token.use-case";

import { makeAccountRepository } from "./make-account.repository";
import { makeSessionRepository } from "./make-session.repository";
import { makeTokenService } from "./make-token.service";

export function makeRefreshTokenUseCase() {
  const sessionRepository = makeSessionRepository();
  const accountRepository = makeAccountRepository();
  const tokenService = makeTokenService();

  return new RefreshTokenUseCase(
    sessionRepository,
    accountRepository,
    tokenService
  );
}
