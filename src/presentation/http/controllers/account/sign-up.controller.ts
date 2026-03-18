import { type FastifyReply, type FastifyRequest } from "fastify";

import { SignUpUseCase } from "../../../../application/use-cases/account/sign-up.use-case";

import { signUpValidatorSchema } from "../../validators/sign-up.validator";

import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import {
  HTTP_STATUS_SUCCESS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../../../shared/constants/success.constants";

import { type IController } from "../../../../domain/entities/controller.entity";

export class SignUpController implements IController {
  constructor(private readonly _signUpUseCase: SignUpUseCase) {}

  async handler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { name, email, password, role, familyId } =
        signUpValidatorSchema.parse(request.body);

      await this._signUpUseCase.execute({
        name,
        email,
        password,
        role,
        familyId
      });

      reply.status(HTTP_STATUS_SUCCESS.CREATED).send({
        statusCode: HTTP_STATUS_SUCCESS.CREATED,
        details: {
          code: SUCCESS_CODES.ACCOUNT_CREATED,
          message: SUCCESS_MESSAGES.ACCOUNT_CREATED
        }
      });
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      reply.status(statusCode).send(details);
    }
  }
}
