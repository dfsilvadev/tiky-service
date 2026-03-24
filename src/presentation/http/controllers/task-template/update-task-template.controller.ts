import { type FastifyReply, type FastifyRequest } from "fastify";

import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import {
  updateTaskTemplateBodyValidatorSchema,
  updateTaskTemplateParamsValidatorSchema
} from "../../validators/update-task-template.validator";

import {
  HTTP_STATUS_SUCCESS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../../../shared/constants/success.constants";

import { type UpdateTaskTemplateUseCase } from "../../../../application/use-cases/task-template/update-task-template.use-case";
import { type IController } from "../../../../domain/entities/controller.entity";

export class UpdateTaskTemplateController implements IController {
  constructor(
    private readonly _updateTaskTemplateUseCase: UpdateTaskTemplateUseCase
  ) {}

  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { familySub: familyId } = request.user.account;
      const { id } = updateTaskTemplateParamsValidatorSchema.parse(
        request.params
      );
      const {
        title,
        description,
        weight,
        recurrenceType,
        isMandatory,
        recurrencePattern,
        scheduledFor,
        timeLimit,
        subtasks
      } = updateTaskTemplateBodyValidatorSchema.parse(request.body);

      const { taskTemplate } = await this._updateTaskTemplateUseCase.execute(
        id,
        familyId,
        {
          title,
          description,
          weight,
          recurrenceType,
          isMandatory,
          recurrencePattern,
          scheduledFor,
          timeLimit,
          subtasks
        }
      );

      reply.status(HTTP_STATUS_SUCCESS.OK).send({
        statusCode: HTTP_STATUS_SUCCESS.OK,
        details: {
          code: SUCCESS_CODES.RESOURCE_UPDATED,
          message: SUCCESS_MESSAGES.RESOURCE_UPDATED,
          data: taskTemplate
        }
      });
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      reply.status(statusCode).send(details);
    }
  }
}
