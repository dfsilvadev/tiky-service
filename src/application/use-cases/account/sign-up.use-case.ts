import { AccountAlreadyExistsError } from "../../../domain/errors";

import { type IAccountRepository } from "../../../domain/repositories/account.repository";
import { type IEncryptionService } from "../../../domain/services/password-hasher.service";
import { type ISignUpDTO } from "../../dtos/account/sign-up.dto";

export class SignUpUseCase {
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _passwordHasher: IEncryptionService
  ) {}

  async execute({ name, email, password, role }: ISignUpDTO) {
    const accountAlreadyExists =
      await this._accountRepository.findByEmail(email);

    if (accountAlreadyExists) throw new AccountAlreadyExistsError(email);

    const hashedPassword = await this._passwordHasher.hash(password);

    const account = await this._accountRepository.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    return { account };
  }
}
