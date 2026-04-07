export interface ICreateTaskInstanceDTO {
  readonly templateId: string;
  readonly playerId: string;
  readonly date: Date;
  readonly subtasks?: string[];
}
