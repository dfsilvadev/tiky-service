import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GetTaskTemplateUseCase } from "./get-task-template.use-case";

import { ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";
import { InMemoryTaskTemplateRepository } from "../../../infrastructure/persistence/in-memory/in-memory.task-template.repository";

import { ERROR_MESSAGES } from "../../../shared/constants/error.constants";

import { DUMMY_TASK_TEMPLATE } from "../../../shared/mocks/data.mocked";

let taskTemplateRepository: ITaskTemplateRepository;
let sut: GetTaskTemplateUseCase;

describe("Get Task Template Use Case (Unit)", () => {
  beforeEach(() => {
    taskTemplateRepository = new InMemoryTaskTemplateRepository();
    sut = new GetTaskTemplateUseCase(taskTemplateRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should get a task template by id and family id", async () => {
    const taskTemplateResponse = await taskTemplateRepository.create({
      ...DUMMY_TASK_TEMPLATE,
      baseXp: 50
    });

    const { taskTemplate } = await sut.execute(
      taskTemplateResponse.id,
      DUMMY_TASK_TEMPLATE.familyId
    );

    expect(taskTemplate).toEqual(taskTemplateResponse);
  });

  it("should throw an error if task template does not exist", async () => {
    await expect(
      sut.execute("non-existent-id", DUMMY_TASK_TEMPLATE.familyId)
    ).rejects.toThrowError(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
  });
});
