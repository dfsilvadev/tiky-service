import { type ISignUpDTO } from "../../application/dtos/account/sing-up.dto";
import { type Account } from "../../generated/prisma/client";

export interface IAccountRepository {
  readonly findByEmail: (_email: string) => Promise<Account | null>;
  readonly create: (_input: ISignUpDTO) => Promise<Account>;
}
