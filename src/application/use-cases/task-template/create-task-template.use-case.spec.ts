import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CreateTaskTemplateUseCase } from "./create-task-template.use-case";

import { ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";

import { InMemoryTaskTemplateRepository } from "../../../infrastructure/persistence/in-memory/in-memory.task-template.repository";

import { DUMMY_TASK_TEMPLATE } from "../../../shared/mocks/data.mocked";

import { ECONOMY_RULES } from "../../../domain/constants/economy.constants";

let taskTemplateRepository: ITaskTemplateRepository;
let sut: CreateTaskTemplateUseCase;

describe("Create Task Template Use Case (Unit)", () => {
  beforeEach(() => {
    taskTemplateRepository = new InMemoryTaskTemplateRepository();
    sut = new CreateTaskTemplateUseCase(taskTemplateRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new task template with valid data", async () => {
    const { createdTaskTemplate } = await sut.execute(DUMMY_TASK_TEMPLATE);

    expect(createdTaskTemplate).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
        title: DUMMY_TASK_TEMPLATE.title,
        description: DUMMY_TASK_TEMPLATE.description,
        accountId: DUMMY_TASK_TEMPLATE.accountId,
        familyId: DUMMY_TASK_TEMPLATE.familyId
      })
    );
  });

  it("should calculate baseXp based on the task weight", async () => {
    const { createdTaskTemplate } = await sut.execute(DUMMY_TASK_TEMPLATE);

    expect(createdTaskTemplate.baseXp).toBe(
      ECONOMY_RULES.TASK_WEIGHT_XP[DUMMY_TASK_TEMPLATE.weight]
    );
  });
});
