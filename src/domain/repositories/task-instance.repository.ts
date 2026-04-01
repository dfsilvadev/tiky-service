import { type TaskInstance } from "../../generated/prisma/client";

export interface ICreateTaskInstanceDTO {
  readonly templateId: string;
  readonly playerId: string;
  readonly date: Date;
}

export interface ITaskInstanceRepository {
  create(_input: any): Promise<TaskInstance>;
  findOneById(_id: string): Promise<TaskInstance | null>;
  findByTemplateAndDate(
    _templateId: string,
    _playerId: string,
    _today: Date
  ): Promise<TaskInstance | null>;
  findManyByPlayerId(_playerId: string): Promise<TaskInstance[]>;
}
