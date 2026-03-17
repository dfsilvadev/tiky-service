import { type FastifyReply, type FastifyRequest } from "fastify";

import { SignInUseCase } from "../../../../application/use-cases/auth/sign-in.use-case";

import { signInValidatorSchema } from "../../validators/sign-in.validator";

import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import { type IController } from "../../../../domain/entities/controller.entity";

import { HTTP_STATUS_SUCCESS } from "../../../../shared/constants/success.constants";

export class SignInController implements IController {
  constructor(
    private readonly _signInUseCase: SignInUseCase,
    private readonly _cookieMaxAge: number
  ) {}

  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = signInValidatorSchema.parse(request.body);
      const {
        account: { id, name, email: authenticatedEmail, role }
      } = await this._signInUseCase.execute({
        email,
        password
      });

      const token = await reply.jwtSign(
        { account: { name, email: authenticatedEmail, role } },
        { sub: id }
      );
      const refreshToken = await reply.jwtSign(
        { account: { role } },
        { sub: id, expiresIn: "7d" }
      );

      reply.setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: true,
        maxAge: this._cookieMaxAge //7 * 24 * 60 * 60 // 7 days in seconds
      });

      return reply.status(HTTP_STATUS_SUCCESS.OK).send({
        statusCode: HTTP_STATUS_SUCCESS.CREATED,
        details: {
          token
        }
      });
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      return reply.status(statusCode).send(details);
    }
  }
}
