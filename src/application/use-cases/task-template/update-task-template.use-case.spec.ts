import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { UpdateTaskTemplateUseCase } from "./update-task-template.use-case";

import { ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";
import { InMemoryTaskTemplateRepository } from "../../../infrastructure/persistence/in-memory/in-memory.task-template.repository";

import {
  RecurrenceType,
  TemplateStatus,
  Weight
} from "../../../generated/prisma/client";

import { ERROR_MESSAGES } from "../../../shared/constants/error.constants";
import { DUMMY_TASK_TEMPLATE } from "../../../shared/mocks/data.mocked";
import { getXpByWeight } from "../../../shared/utils/get-xp-by-weight";

let taskTemplateRepository: ITaskTemplateRepository;
let sut: UpdateTaskTemplateUseCase;

describe("Update Task Template Use Case (Unit)", () => {
  beforeEach(() => {
    taskTemplateRepository = new InMemoryTaskTemplateRepository();
    sut = new UpdateTaskTemplateUseCase(taskTemplateRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should update an existing task template with valid data", async () => {
    const createdTemplate = await taskTemplateRepository.create({
      ...DUMMY_TASK_TEMPLATE,
      baseXp: getXpByWeight(DUMMY_TASK_TEMPLATE.weight)
    });

    const updatedData = {
      title: "Updated Test Task",
      description: "An updated task for testing",
      weight: Weight.BASIC,
      recurrenceType: RecurrenceType.DAILY
    };

    const { updatedTaskTemplate } = await sut.execute(
      createdTemplate.id,
      createdTemplate.familyId,
      { ...updatedData }
    );

    expect(updatedTaskTemplate).toMatchObject(
      expect.objectContaining({
        id: createdTemplate.id,
        title: updatedData.title,
        description: updatedData.description,
        accountId: createdTemplate.accountId,
        familyId: createdTemplate.familyId,
        weight: updatedData.weight,
        recurrenceType: updatedData.recurrenceType
      })
    );
  });

  it("should throw ResourceNotFoundError if task template does not exist", async () => {
    await expect(
      sut.execute("non-existent-id", "family-id", {
        title: "Should Fail"
      })
    ).rejects.toThrow(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
  });

  it("should update baseXp when weight is updated", async () => {
    const createdTemplate = await taskTemplateRepository.create({
      ...DUMMY_TASK_TEMPLATE,
      baseXp: getXpByWeight(DUMMY_TASK_TEMPLATE.weight)
    });

    const updatedWeight = Weight.BASIC;

    const { updatedTaskTemplate } = await sut.execute(
      createdTemplate.id,
      createdTemplate.familyId,
      {
        weight: updatedWeight
      }
    );

    expect(updatedTaskTemplate.baseXp).toBe(getXpByWeight(updatedWeight));
  });

  it("should be able to update the status of a task template", async () => {
    const createdTemplate = await taskTemplateRepository.create({
      ...DUMMY_TASK_TEMPLATE,
      baseXp: getXpByWeight(DUMMY_TASK_TEMPLATE.weight)
    });

    const { updatedTaskTemplate } = await sut.execute(
      createdTemplate.id,
      createdTemplate.familyId,
      {
        status: TemplateStatus.ARCHIVED
      }
    );

    expect(updatedTaskTemplate.status).toBe(TemplateStatus.ARCHIVED);
  });
});
