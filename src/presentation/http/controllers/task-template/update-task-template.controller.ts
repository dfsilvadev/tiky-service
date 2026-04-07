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

import { type CheckAndGenerateTodayInstanceService } from "../../../../application/services/check-and-generate-today-instance.service";
import { type DeletePendingTodayInstanceUseCase } from "../../../../application/use-cases/task-instance/delete-pending-today-instance.use-case";
import { type UpdateTaskTemplateUseCase } from "../../../../application/use-cases/task-template/update-task-template.use-case";
import { type IController } from "../../../../domain/entities/controller.entity";

export class UpdateTaskTemplateController implements IController {
  constructor(
    private readonly _updateTaskTemplateUseCase: UpdateTaskTemplateUseCase,
    private readonly _deletePendingTodayInstanceUseCase: DeletePendingTodayInstanceUseCase,
    private readonly _checkAndGenerateTodayInstanceService: CheckAndGenerateTodayInstanceService
  ) {}

  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const {
        sub,
        account: { familySub: familyId }
      } = request.user;
      const { id } = updateTaskTemplateParamsValidatorSchema.parse(
        request.params
      );
      const dto = updateTaskTemplateBodyValidatorSchema.parse(request.body);

      const { updatedTaskTemplate } =
        await this._updateTaskTemplateUseCase.execute(id, familyId, {
          ...dto,
          accountId: sub
        });

      await this._deletePendingTodayInstanceUseCase.execute({
        templateId: updatedTaskTemplate.id,
        playerId: updatedTaskTemplate.playerId
      });

      await this._checkAndGenerateTodayInstanceService.execute({
        template: updatedTaskTemplate,
        playerId: updatedTaskTemplate.playerId
      });

      reply.status(HTTP_STATUS_SUCCESS.OK).send({
        statusCode: HTTP_STATUS_SUCCESS.OK,
        details: {
          code: SUCCESS_CODES.RESOURCE_UPDATED,
          message: SUCCESS_MESSAGES.RESOURCE_UPDATED,
          data: updatedTaskTemplate
        }
      });
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      reply.status(statusCode).send(details);
    }
  }
}
