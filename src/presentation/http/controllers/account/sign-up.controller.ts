import { type FastifyReply, type FastifyRequest } from "fastify";

import { SignUpUseCase } from "../../../../application/use-cases/account/sign-up.use-case";

import { signUpValidator } from "../../validators/sign-up.validator";

import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import { type IController } from "../../../../domain/entities/controller.entity";

export class SignUpController implements IController {
  constructor(private readonly _signUpUseCase: SignUpUseCase) {}

  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password, role } = signUpValidator.parse(
        request.body
      );

      const response = await this._signUpUseCase.execute({
        name,
        email,
        password,
        role
      });

      return reply.status(201).send(response);
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      return reply.status(Number(statusCode)).send(details);
    }
  }
}
