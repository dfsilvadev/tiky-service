import { InvalidCredentialsError } from "../../../domain/errors";

import { type IAccountRepository } from "../../../domain/repositories/account.repository";
import { type IEncryptionService } from "../../../domain/services/encryption.service";
import { type ISignInDTO } from "../../dtos/auth/sign-in.dto";

export class SignInUseCase {
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _passwordHasher: IEncryptionService
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
