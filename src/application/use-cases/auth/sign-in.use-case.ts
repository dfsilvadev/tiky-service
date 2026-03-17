import { InvalidCredentialsError } from "../../../domain/errors";

import { type IAccountRepository } from "../../../domain/repositories/account.repository";
import { type BcryptPasswordHasherService } from "../../../infrastructure/security/bcrypt-password-hasher.service";
import { type ISignInDTO } from "../../dtos/auth/sin-in.dto";

export class SignInUseCase {
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _passwordHasher: BcryptPasswordHasherService
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

    return {
      account: accountAlreadyExists
    };
  }
}
