import { type FastifyReply, type FastifyRequest } from "fastify";

import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import { suggestTaskTemplateValidatorSchema } from "../../validators/suggest-task-template.validator";

import {
  HTTP_STATUS_SUCCESS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../../../shared/constants/success.constants";

import { type SuggestTaskTemplateUseCase } from "../../../../application/use-cases/task-template/suggest-task-template.use-case";
import { type IController } from "../../../../domain/entities/controller.entity";

export class SuggestTaskTemplateController implements IController {
  constructor(
    private readonly _suggestTaskTemplateUseCase: SuggestTaskTemplateUseCase
  ) {}

  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const {
        sub,
        account: { familySub: familyId }
      } = request.user;
      const { title, description, timeLimit } =
        suggestTaskTemplateValidatorSchema.parse(request.body);

      const { suggestedTaskTemplate } =
        await this._suggestTaskTemplateUseCase.execute({
          accountId: sub,
          familyId,
          title,
          description,
          timeLimit
        });

      reply.status(HTTP_STATUS_SUCCESS.CREATED).send({
        statusCode: HTTP_STATUS_SUCCESS.CREATED,
        details: {
          code: SUCCESS_CODES.RESOURCE_CREATED,
          message: SUCCESS_MESSAGES.RESOURCE_CREATED,
          data: suggestedTaskTemplate
        }
      });
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      reply.status(statusCode).send(details);
    }
  }
}
