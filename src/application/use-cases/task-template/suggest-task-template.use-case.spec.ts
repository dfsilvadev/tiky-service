import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SuggestTaskTemplateUseCase } from "./suggest-task-template.use-case";

import { ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";

import { InMemoryTaskTemplateRepository } from "../../../infrastructure/persistence/in-memory/in-memory.task-template.repository";

import { DUMMY_SUGGESTED_TASK_TEMPLATE } from "../../../shared/mocks/data.mocked";

import { TemplateStatus, Weight } from "../../../generated/prisma/client";
import { getXpByWeight } from "../../../shared/utils/get-xp-by-weight";

let taskTemplateRepository: ITaskTemplateRepository;
let sut: SuggestTaskTemplateUseCase;

describe("Suggest Task Template Use Case (Unit)", () => {
  beforeEach(() => {
    taskTemplateRepository = new InMemoryTaskTemplateRepository();
    sut = new SuggestTaskTemplateUseCase(taskTemplateRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new suggested task template with valid data", async () => {
    const { createdTaskTemplate } = await sut.execute(
      DUMMY_SUGGESTED_TASK_TEMPLATE
    );

    expect(createdTaskTemplate).toMatchObject(
      expect.objectContaining({
        title: DUMMY_SUGGESTED_TASK_TEMPLATE.title,
        description: DUMMY_SUGGESTED_TASK_TEMPLATE.description,
        accountId: DUMMY_SUGGESTED_TASK_TEMPLATE.accountId,
        familyId: DUMMY_SUGGESTED_TASK_TEMPLATE.familyId,
        weight: Weight.SUGGESTED,
        status: TemplateStatus.PENDING_APPROVAL
      })
    );
  });

  it("should calculate baseXp based on the task weight", async () => {
    const { createdTaskTemplate } = await sut.execute(
      DUMMY_SUGGESTED_TASK_TEMPLATE
    );

    expect(createdTaskTemplate.baseXp).toBe(getXpByWeight(Weight.SUGGESTED));
  });
});
