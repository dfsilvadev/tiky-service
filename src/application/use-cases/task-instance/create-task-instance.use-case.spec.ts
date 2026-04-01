import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CreateTaskInstanceUseCase } from "./create-task-instance.use-case";

import { ITaskInstanceRepository } from "../../../domain/repositories/task-instance.repository";

import { InMemoryTaskInstanceRepository } from "../../../infrastructure/persistence/in-memory/in-memory.task-instance.repository";
import { DUMMY_TASK_INSTANCE } from "../../../shared/mocks/data.mocked";

let taskTemplateRepository: ITaskInstanceRepository;
let sut: CreateTaskInstanceUseCase;

describe("Create Task Instance Use Case (Unit)", () => {
  beforeEach(() => {
    taskTemplateRepository = new InMemoryTaskInstanceRepository();
    sut = new CreateTaskInstanceUseCase(taskTemplateRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new task instance with valid data", async () => {
    const { createdTaskInstance } = await sut.execute(DUMMY_TASK_INSTANCE);

    expect(createdTaskInstance).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
        templateId: DUMMY_TASK_INSTANCE.templateId,
        playerId: DUMMY_TASK_INSTANCE.playerId,
        date: DUMMY_TASK_INSTANCE.date
      })
    );
  });
});
