import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import { createFamilyValidatorSchema } from "../../validators/create-family.validator";

import {
  HTTP_STATUS_SUCCESS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../../../shared/constants/success.constants";

import { type FastifyReply, type FastifyRequest } from "fastify";
import { type CreateFamilyUseCase } from "../../../../application/use-cases/family/create-family.use-case";
import { type IController } from "../../../../domain/entities/controller.entity";

export class CreateFamilyController implements IController {
  constructor(private readonly _createFamilyUseCase: CreateFamilyUseCase) {}

  async handler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { name, description } = createFamilyValidatorSchema.parse(
        request.body
      );

      await this._createFamilyUseCase.execute({
        name,
        description
      });

      reply.status(HTTP_STATUS_SUCCESS.CREATED).send({
        statusCode: HTTP_STATUS_SUCCESS.CREATED,
        details: {
          code: SUCCESS_CODES.RESOURCE_CREATED,
          message: SUCCESS_MESSAGES.RESOURCE_CREATED
        }
      });
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      reply.status(statusCode).send(details);
    }
  }
}
