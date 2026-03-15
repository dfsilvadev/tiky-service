import { AccountAlreadyExistsError } from "../../../domain/errors";

import { type IAccountRepository } from "../../../domain/repositories/account.repository";
import { type BcryptPasswordHasherService } from "../../../infrastructure/security/bcrypt-password-hasher.service";
import { type ISignUpDTO } from "../../dtos/account/sing-up.dto";

export class SignUpUseCase {
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _passwordHasher: BcryptPasswordHasherService
  ) {}

  async execute({ name, email, password, role }: ISignUpDTO) {
    const userAlreadyExists = await this._accountRepository.findByEmail(email);

    if (userAlreadyExists) throw new AccountAlreadyExistsError(email);

    const hashedPassword = await this._passwordHasher.hash(password);

    const account = await this._accountRepository.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    return account;
  }
}
