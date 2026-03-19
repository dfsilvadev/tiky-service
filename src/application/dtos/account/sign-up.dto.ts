import { type Role } from "../../../generated/prisma/enums";

export interface ISignUpDTO {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: Role;
  readonly familyId: string;
}
