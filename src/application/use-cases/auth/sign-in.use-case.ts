import { InvalidCredentialsError } from "../../../domain/errors";

import { env } from "../../../shared/config/env";

import { type IAccountRepository } from "../../../domain/repositories/account.repository";
import { type ISessionRepository } from "../../../domain/repositories/session.repository";
import { type IEncryptionService } from "../../../domain/services/encryption.service";
import { type ITokenService } from "../../../domain/services/token.service";
import { type ISignInDTO } from "../../dtos/auth/sign-in.dto";

export class SignInUseCase {
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _passwordHasher: IEncryptionService,
    private readonly _tokenService: ITokenService,
    private readonly _sessionRepository: ISessionRepository
  ) {}

  async execute({ email, password }: ISignInDTO) {
    const accountAlreadyExists =
      await this._accountRepository.findByEmail(email);

    if (!accountAlreadyExists) throw new InvalidCredentialsError();

    const doesPasswordMatch = await this._passwordHasher.compare(
      password,
      accountAlreadyExists.passwordHash
    );

    if (!doesPasswordMatch) throw new InvalidCredentialsError();

    const token = this._tokenService.sign({
      payload: {
        account: {
          name: accountAlreadyExists.name,
          email: accountAlreadyExists.email,
          role: accountAlreadyExists.role
        }
      },
      options: { sub: accountAlreadyExists.id, expiresIn: env.ACCESS_TOKEN_TTL }
    });

    const refreshToken = this._tokenService.sign({
      payload: { account: { role: accountAlreadyExists.role } },
      options: { sub: accountAlreadyExists.id, expiresIn: "7d" }
    });

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // 7 days

    await this._sessionRepository.create({
      userId: accountAlreadyExists.id,
      refreshToken,
      expiresAt: expirationDate
    });

    return {
      account: accountAlreadyExists,
      token,
      refreshToken
    };
  }
}
