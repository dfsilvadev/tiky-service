import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CreateTaskInstanceUseCase } from "./create-task-instance.use-case";

import { ITaskInstanceRepository } from "../../../domain/repositories/task-instance.repository";

import { InstanceStatus } from "../../../generated/prisma/client";

import { InMemoryTaskInstanceRepository } from "../../../infrastructure/persistence/in-memory/in-memory.task-instance.repository";
import { DUMMY_TASK_INSTANCE } from "../../../shared/mocks/data.mocked";

let taskInstanceRepository: ITaskInstanceRepository;
let sut: CreateTaskInstanceUseCase;

describe("Create Task Instance Use Case (Unit)", () => {
  beforeEach(() => {
    taskInstanceRepository = new InMemoryTaskInstanceRepository();
    sut = new CreateTaskInstanceUseCase(taskInstanceRepository);
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

  it("should create a new task instance with subtasks", async () => {
    const createSpy = vi.spyOn(taskInstanceRepository, "create");

    const epicInput = {
      ...DUMMY_TASK_INSTANCE,
      subtasks: ["Arrumar a cama", "Guardar os brinquedos"]
    };
    const { createdTaskInstance } = await sut.execute(epicInput);

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        subtasks: ["Arrumar a cama", "Guardar os brinquedos"]
      })
    );
    expect(createdTaskInstance).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
        templateId: epicInput.templateId,
        playerId: epicInput.playerId,
        date: epicInput.date,
        subtasks: [
          expect.objectContaining({
            id: expect.any(String),
            description: "Arrumar a cama",
            status: InstanceStatus.PENDING
          }),
          expect.objectContaining({
            id: expect.any(String),
            description: "Guardar os brinquedos",
            status: InstanceStatus.PENDING
          })
        ]
      })
    );
  });
});
