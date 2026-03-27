import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ApprovalTaskTemplateUseCase } from "./approval-task-template.use-case";

import { ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";
import { InMemoryTaskTemplateRepository } from "../../../infrastructure/persistence/in-memory/in-memory.task-template.repository";

import { TemplateStatus, Weight } from "../../../generated/prisma/client";

import { ERROR_MESSAGES } from "../../../shared/constants/error.constants";
import { DUMMY_SUGGESTED_TASK_TEMPLATE } from "../../../shared/mocks/data.mocked";
import { getXpByWeight } from "../../../shared/utils/get-xp-by-weight";

let taskTemplateRepository: ITaskTemplateRepository;
let sut: ApprovalTaskTemplateUseCase;

describe("Approval Task Template Use Case (Unit)", () => {
  beforeEach(() => {
    taskTemplateRepository = new InMemoryTaskTemplateRepository();
    sut = new ApprovalTaskTemplateUseCase(taskTemplateRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should approve an existing task template with valid data", async () => {
    const createdTemplate = await taskTemplateRepository.create({
      ...DUMMY_SUGGESTED_TASK_TEMPLATE,
      baseXp: getXpByWeight(DUMMY_SUGGESTED_TASK_TEMPLATE.weight)
    });

    const { approvedTaskTemplate } = await sut.execute({
      templateId: createdTemplate.id,
      familyId: createdTemplate.familyId,
      weight: Weight.IMPORTANT
    });

    expect(approvedTaskTemplate).toHaveProperty(
      "status",
      TemplateStatus.ACTIVE
    );
    expect(approvedTaskTemplate).toHaveProperty("weight", Weight.IMPORTANT);
  });

  it("should be able calculate base XP based on weight", async () => {
    const createdTemplate = await taskTemplateRepository.create({
      ...DUMMY_SUGGESTED_TASK_TEMPLATE,
      baseXp: getXpByWeight(DUMMY_SUGGESTED_TASK_TEMPLATE.weight)
    });

    const { approvedTaskTemplate } = await sut.execute({
      templateId: createdTemplate.id,
      familyId: createdTemplate.familyId,
      weight: Weight.IMPORTANT
    });

    expect(approvedTaskTemplate).toHaveProperty(
      "baseXp",
      getXpByWeight(Weight.IMPORTANT)
    );
  });

  it("should throw ResourceNotFoundError if task template does not exist", async () => {
    await expect(
      sut.execute({
        templateId: "non-existing-id",
        familyId: "some-family-id",
        weight: Weight.BASIC
      })
    ).rejects.toThrow(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
  });

  it("should throw ConflictError if task template is not pending approval", async () => {
    const createdTemplate = await taskTemplateRepository.create({
      ...DUMMY_SUGGESTED_TASK_TEMPLATE,
      baseXp: getXpByWeight(DUMMY_SUGGESTED_TASK_TEMPLATE.weight),
      status: TemplateStatus.ACTIVE
    });

    await expect(
      sut.execute({
        templateId: createdTemplate.id,
        familyId: createdTemplate.familyId,
        weight: Weight.BASIC
      })
    ).rejects.toThrow("Task template is not pending approval");
  });
});
