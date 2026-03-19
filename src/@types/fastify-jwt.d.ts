import "@fastify/jwt";

import { type Role } from "../generated/prisma/client";

interface IAccountPayload {
  readonly name: string;
  readonly email: string;
  readonly role: Role;
}

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string;
      account: IAccountPayload;
    };
  }
}
