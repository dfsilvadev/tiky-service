import { type FastifyReply, type FastifyRequest } from "fastify";

import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import { type SignOutUseCase } from "../../../../application/use-cases/auth/sign-out.use-case";
import { type IController } from "../../../../domain/entities/controller.entity";

export class SignOutController implements IController {
  constructor(private readonly _SignOutUseCase: SignOutUseCase) {}

  async handler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      await request.jwtVerify({ onlyCookie: true });

      const refreshToken = request.cookies.refreshToken as string;

      await this._SignOutUseCase.execute({ refreshToken });

      reply.clearCookie("refreshToken", { path: "/" });
      reply.status(204).send();
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      reply.status(statusCode).send(details);
    }
  }
}
