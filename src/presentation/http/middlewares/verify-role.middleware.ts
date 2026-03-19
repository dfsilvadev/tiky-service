import { type FastifyReply, type FastifyRequest } from "fastify";

import {
  ERROR_CODES,
  ERROR_MESSAGES
} from "../../../shared/constants/error.constants";

import { type Role } from "../../../generated/prisma/enums";

export function verifyRoleMiddleware(rolesToVerify: Array<Role>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userRole = request.user.account.role;

    if (!rolesToVerify.includes(userRole))
      return reply.status(403).send({
        code: ERROR_CODES.FORBIDDEN,
        message: ERROR_MESSAGES.FORBIDDEN
      });
  };
}
