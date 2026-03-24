import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DeleteTaskTemplateUseCase } from "./delete-task-template.use-case";

import { ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";

import { InMemoryTaskTemplateRepository } from "../../../infrastructure/persistence/in-memory/in-memory.task-template.repository";

import { TemplateStatus } from "../../../generated/prisma/enums";

import { ERROR_MESSAGES } from "../../../shared/constants/error.constants";
import { DUMMY_TASK_TEMPLATE } from "../../../shared/mocks/data.mocked";
import { getXpByWeight } from "../../../shared/utils/get-xp-by-weight";

let taskTemplateRepository: ITaskTemplateRepository;
let sut: DeleteTaskTemplateUseCase;

describe("Update Task Template Use Case (Unit)", () => {
  beforeEach(() => {
    taskTemplateRepository = new InMemoryTaskTemplateRepository();
    sut = new DeleteTaskTemplateUseCase(taskTemplateRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should delete an existing task template", async () => {
    const createdTemplate = await taskTemplateRepository.create({
      ...DUMMY_TASK_TEMPLATE,
      baseXp: getXpByWeight(DUMMY_TASK_TEMPLATE.weight)
    });

    const deletedTemplate = await sut.execute({
      id: createdTemplate.id,
      familyId: createdTemplate.familyId
    });

    expect(deletedTemplate).toMatchObject(
      expect.objectContaining({
        id: createdTemplate.id,
        title: createdTemplate.title,
        description: createdTemplate.description,
        accountId: createdTemplate.accountId,
        familyId: createdTemplate.familyId,
        weight: createdTemplate.weight,
        recurrenceType: createdTemplate.recurrenceType,
        deletedAt: expect.any(Date),
        status: TemplateStatus.ARCHIVED
      })
    );
  });

  it("should throw ResourceNotFoundError if task template does not exist", async () => {
    await expect(
      sut.execute({ id: "non-existent-id", familyId: "non-existent-family" })
    ).rejects.toThrowError(
      expect.objectContaining({
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND
      })
    );
  });

  it("should throw ResourceNotFoundError if task template is already deleted", async () => {
    const createdTemplate = await taskTemplateRepository.create({
      ...DUMMY_TASK_TEMPLATE,
      baseXp: getXpByWeight(DUMMY_TASK_TEMPLATE.weight)
    });

    await sut.execute({
      id: createdTemplate.id,
      familyId: createdTemplate.familyId
    });

    await expect(
      sut.execute({
        id: createdTemplate.id,
        familyId: createdTemplate.familyId
      })
    ).rejects.toThrowError(
      expect.objectContaining({
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND
      })
    );
  });
});
