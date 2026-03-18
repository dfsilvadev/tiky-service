import { type FastifyInstance } from "fastify";

import { FastifyTokenService } from "../security/token.service";

export function makeTokenService(app: FastifyInstance) {
  return new FastifyTokenService(app);
}
