import { type FastifyReply, type FastifyRequest } from "fastify";

import { toHttpResponse } from "../../../shared/utils/http-error-mapper";

import { ERROR_MESSAGES } from "../../../shared/constants/error.constants";

export async function verifyJwtMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();
  } catch (error) {
    const { statusCode, details } = toHttpResponse(error);
    reply
      .status(statusCode)
      .send(details ?? { message: ERROR_MESSAGES.UNAUTHORIZED });
  }
}
