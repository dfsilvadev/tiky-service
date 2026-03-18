import { RefreshTokenUseCase } from "../../../../application/use-cases/auth/refresh-token.use-case";

import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import { HTTP_STATUS_SUCCESS } from "../../../../shared/constants/success.constants";

import { type FastifyReply, type FastifyRequest } from "fastify";
import { type IController } from "../../../../domain/entities/controller.entity";

export class RefreshTokenController implements IController {
  constructor(private readonly _refreshTokenUseCase: RefreshTokenUseCase) {}

  async handler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      await request.jwtVerify({ onlyCookie: true });
      const refreshToken = request.cookies.refreshToken as string;

      const { token } = await this._refreshTokenUseCase.execute({
        refreshToken
      });

      reply.status(HTTP_STATUS_SUCCESS.OK).send({
        statusCode: HTTP_STATUS_SUCCESS.OK,
        details: {
          token
        }
      });
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);

      reply.status(statusCode).send(details);
    }
  }
}
