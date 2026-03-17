import { app } from "../../presentation/server/app";

import { FastifyTokenService } from "../security/token.service";

export function makeTokenService() {
  return new FastifyTokenService(app);
}
