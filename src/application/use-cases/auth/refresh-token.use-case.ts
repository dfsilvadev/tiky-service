import { UnauthorizedError } from "../../../domain/errors/unauthorized.error";

import { env } from "../../../shared/config/env";

import { type IAccountRepository } from "../../../domain/repositories/account.repository";
import { type ISessionRepository } from "../../../domain/repositories/session.repository";
import { type ITokenService } from "../../../domain/services/token.service";
import { type IRefreshTokenDTO } from "../../dtos/auth/refresh-token.dto";

export class RefreshTokenUseCase {
  constructor(
    private readonly _sessionRepository: ISessionRepository,
    private readonly _accountRepository: IAccountRepository,
    private readonly _tokenService: ITokenService
  ) {}

  async execute({ refreshToken }: IRefreshTokenDTO) {
    const session = await this._sessionRepository.findByToken(refreshToken);

    if (!session || session.isRevoked || session.expiresAt < new Date())
      throw new UnauthorizedError("Invalid or expired refresh token");

    const user = await this._accountRepository.findById(session.userId);

    if (!user) throw new UnauthorizedError("User not found");

    const newAccessToken = this._tokenService.sign({
      payload: {
        account: { name: user.name, email: user.email, role: user.role }
      },
      options: { sub: user.id, expiresIn: env.ACCESS_TOKEN_TTL }
    });

    return { token: newAccessToken };
  }
}
